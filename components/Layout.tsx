import { useState, ReactNode } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import CustomHeader from './CustomHeader';
import CustomNavbar from './CustomNavbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // AppShellのためのステート
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <CustomNavbar opened={opened} />
      }
      header={
        <CustomHeader opened={opened} setOpened={setOpened} theme={theme} />
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
