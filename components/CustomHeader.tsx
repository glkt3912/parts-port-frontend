import React from 'react';
import axios from 'axios';
import {
  Container,
  Group,
  ActionIcon,
  Title,
  useMantineColorScheme,
  MantineTheme,
  Header,
  MediaQuery,
  Burger,
  Menu
} from '@mantine/core';
import { IconSun, IconMoon, IconSettings, IconDevicesPc, IconUser, IconLogout } from '@tabler/icons';
import { useQueryUser } from '../hooks/useQueryUser';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

interface CustomHeaderProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  theme: MantineTheme;
}

export const CustomHeader = ({ opened, setOpened, theme }: CustomHeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { data: user } = useQueryUser() || null;
  const dark = colorScheme === 'dark';
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    queryClient.removeQueries(['tasks']);
    queryClient.removeQueries(['user']);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push('/');
  };

  return (
    <Header height={70} p="md">
      {/* <Container> */}
        <Group position="apart" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(!opened)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          <Title order={2} ><IconDevicesPc size={24}/> PC Parts Picker</Title>

          <Group>
          <Menu width={200} offset={20}>
              <Menu.Target>
                <ActionIcon variant="filled" color="teal" size="lg">
                  <IconUser size={18}/>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Your Account</Menu.Label>
                <Menu.Item >Name: {user?.name ?? "Guest"}</Menu.Item>
                <Menu.Item >ID: {user?.id}</Menu.Item>
                <Menu.Item>Email: {user?.email}</Menu.Item>
                <Menu.Divider />
                <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Item icon={<IconLogout size={14}/>} onClick={() => logout()}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <ActionIcon
              variant="filled"
              color={dark ? 'yellow' : 'blue'}
              size="lg"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </Group>
        </Group>
      {/* </Container> */}
    </Header>
  );
};
