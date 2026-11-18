import React, { type ReactNode, useEffect, useMemo } from 'react';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type { Props } from '@theme/DocRoot/Layout';
import { useDocsSidebarChrome } from '@theme/shared/docsSidebarChromeContext';
import {
  applyXenoPageTheme,
  clearXenoPageTheme,
  getXenoPageTheme,
  type XenoPageThemeDefinition,
} from '@theme/shared/xenoPageTheme';

import styles from './styles.module.css';

export default function DocRootLayout({ children }: Props): ReactNode {
  const sidebar = useDocsSidebar();
  const { pathname } = useLocation();
  const {
    hiddenSidebarContainer,
    setHiddenSidebarContainer,
    setSidebarAvailable,
  } = useDocsSidebarChrome();
  const { pageThemes } = usePluginData('wiki-xenotheme') as {
    pageThemes: XenoPageThemeDefinition[];
  };
  const xenoPageTheme = useMemo(
    () => getXenoPageTheme(pathname, pageThemes),
    [pathname, pageThemes],
  );

  useEffect(() => {
    setSidebarAvailable(Boolean(sidebar));
    return () => setSidebarAvailable(false);
  }, [sidebar, setSidebarAvailable]);

  useIsomorphicLayoutEffect(() => {
    applyXenoPageTheme(document.documentElement, xenoPageTheme, pageThemes);

    return () => {
      clearXenoPageTheme(document.documentElement, pageThemes);
    };
  }, [xenoPageTheme, pageThemes]);

  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <div className={styles.docRoot}>
        {sidebar && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}
