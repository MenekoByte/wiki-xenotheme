// Node-side helpers. Both the config (headTags) and the plugin use these.
const DEFAULT_DECOR = "default";
const DEFAULT_DECOR_STYLE = "default";

// RegExp does not survive JSON; ship source + flags instead.
function serializePageThemes(pageThemes = []) {
  return pageThemes.map(({pattern, decor, style, variables}) => ({
    pattern: pattern.source,
    flags: pattern.flags,
    decor,
    style,
    variables,
  }));
}

// Inline <head> script that sets the page theme and rendering mode before first paint.
function graphicsBootstrapScript(pageThemes = []) {
  const graphicsThemeDefinitions = serializePageThemes(pageThemes);
  return String.raw`(() => {
    const root = document.documentElement;
    const storageKey = 'xeno-graphics-mode-v2';
  
    const pathname = window.location.pathname;
    const themeDefinitions = ${JSON.stringify(graphicsThemeDefinitions)};
    const theme = themeDefinitions.find(({pattern, flags}) =>
      new RegExp(pattern, flags).test(pathname),
    );
  
    root.dataset.xenoDecor = theme?.decor ?? ${JSON.stringify(DEFAULT_DECOR)};
    root.dataset.xenoDecorStyle = theme?.style ?? ${JSON.stringify(DEFAULT_DECOR_STYLE)};
    for (const [name, value] of Object.entries(theme?.variables ?? {})) {
      root.style.setProperty(name, value);
    }
  
    const applyMode = (mode) => {
      root.toggleAttribute('data-xeno-software-rendering', mode === 'software');
      root.removeAttribute('data-xeno-rendering-pending');
    };
  
    let cachedMode = null;
    try {
      cachedMode = window.sessionStorage.getItem(storageKey);
    } catch {}
  
    if (cachedMode === 'hardware' || cachedMode === 'software') {
      applyMode(cachedMode);
      return;
    }
  
    root.setAttribute('data-xeno-rendering-pending', '');
  
    const finish = (mode) => {
      try {
        window.sessionStorage.setItem(storageKey, mode);
      } catch {}
      applyMode(mode);
    };
  
    const canvas = document.createElement('canvas');
    let context = null;
    try {
      const attributes = {failIfMajorPerformanceCaveat: true};
      context = canvas.getContext('webgl2', attributes) || canvas.getContext('webgl', attributes);
    } catch {}
  
    if (!context) {
      finish('software');
      return;
    }
  
    context.getExtension('WEBGL_lose_context')?.loseContext();
  
    if (!navigator.gpu) {
      finish('software');
      return;
    }
  
    navigator.gpu.requestAdapter().then(
      async (adapter) => {
        if (!adapter) {
          finish('software');
          return;
        }
  
        let info = adapter.info;
        if (!info && typeof adapter.requestAdapterInfo === 'function') {
          try {
            info = await adapter.requestAdapterInfo();
          } catch {}
        }
  
        const description = [
          info?.vendor,
          info?.architecture,
          info?.device,
          info?.description,
        ].filter(Boolean).join(' ').toLowerCase();
        const isSoftwareAdapter =
          adapter.isFallbackAdapter === true ||
          info?.isFallbackAdapter === true ||
          /software|swiftshader|llvmpipe|lavapipe|basic render/.test(description);
  
        finish(isSoftwareAdapter ? 'software' : 'hardware');
      },
      () => finish('software'),
    );
  })();`;
}

module.exports = {serializePageThemes, graphicsBootstrapScript};
