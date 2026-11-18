export const DEFAULT_XENO_DECOR = 'default';
export const DEFAULT_XENO_DECOR_STYLE = 'default';

// Serialized form of the site's `pageThemes` option (RegExp shipped as source + flags).
export type XenoPageThemeDefinition = {
  pattern: string;
  flags?: string;
  decor: string;
  style?: string;
  variables?: Record<string, string>;
};

export type XenoPageTheme = {
  decor: string;
  style: string;
  variables: Record<string, string>;
};

function getVariableKeys(
  definitions: readonly XenoPageThemeDefinition[],
): string[] {
  return Array.from(
    new Set(definitions.flatMap(({variables = {}}) => Object.keys(variables))),
  );
}

export function getXenoPageTheme(
  pathname: string,
  definitions: readonly XenoPageThemeDefinition[],
): XenoPageTheme {
  const match = definitions.find(({pattern, flags}) =>
    new RegExp(pattern, flags).test(pathname),
  );

  return {
    decor: match?.decor ?? DEFAULT_XENO_DECOR,
    style: match?.style ?? DEFAULT_XENO_DECOR_STYLE,
    variables: {...(match?.variables ?? {})},
  };
}

export function applyXenoPageTheme(
  root: HTMLElement,
  theme: XenoPageTheme,
  definitions: readonly XenoPageThemeDefinition[],
): void {
  root.dataset.xenoDecor = theme.decor;
  root.dataset.xenoDecorStyle = theme.style;

  getVariableKeys(definitions).forEach((key) => {
    root.style.removeProperty(key);
  });

  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function clearXenoPageTheme(
  root: HTMLElement,
  definitions: readonly XenoPageThemeDefinition[],
): void {
  delete root.dataset.xenoDecor;
  delete root.dataset.xenoDecorStyle;

  getVariableKeys(definitions).forEach((key) => {
    root.style.removeProperty(key);
  });
}
