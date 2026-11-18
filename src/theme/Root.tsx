import React from 'react';
import Root from '@theme-init/Root';
import { DocsSidebarChromeProvider } from '@theme/shared/docsSidebarChromeContext';

export default function RootWrapper(props: React.ComponentProps<typeof Root>): React.ReactNode {
  return (
    <DocsSidebarChromeProvider>
      <Root {...props} />
    </DocsSidebarChromeProvider>
  );
}
