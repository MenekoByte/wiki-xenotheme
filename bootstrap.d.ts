export type PageThemeDefinition = {
  pattern: RegExp;
  decor: string;
  style?: string;
  variables?: Record<string, string>;
};

export function serializePageThemes(
  pageThemes?: readonly PageThemeDefinition[],
): unknown[];

export function graphicsBootstrapScript(
  pageThemes?: readonly PageThemeDefinition[],
): string;
