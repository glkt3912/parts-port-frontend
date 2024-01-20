import React from 'react';
import {
  Container,
  Group,
  ActionIcon,
  Text,
  Title,
  useMantineColorScheme,
  MantineTheme,
  Header,
  MediaQuery,
  Burger
} from '@mantine/core';
import { IconSun, IconMoon, IconSettings } from '@tabler/icons';
import { useQueryUser } from '../hooks/useQueryUser';

interface CustomHeaderProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  theme: MantineTheme;
}

export const CustomHeader = ({ opened, setOpened, theme }: CustomHeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { data: user } = useQueryUser() || null;
  const dark = colorScheme === 'dark';

  return (
    <Header height={70} p="md">
      <Container>
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
          <Title order={1}>PC Parts Picker</Title>

          <Group>
            {user ? (
              <>
                <Text size="sm">UserID: {user?.id}</Text>
                <Text size="sm">Name: {user?.name}</Text>
                <Text size="sm">Email: {user?.email}</Text>
              </>
            ) : (
              // <Text size="sm">ゲストユーザーとして閲覧中</Text>
              ''
            )}

            <ActionIcon
              variant="filled"
              color={dark ? 'yellow' : 'blue'}
              size="lg"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>

            <ActionIcon variant="filled" size="lg">
              <IconSettings size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Header>
  );
};
