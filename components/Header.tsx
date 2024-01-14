import React from 'react';
import {
  Container,
  Group,
  ActionIcon,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon, IconSettings } from '@tabler/icons';
import { useQueryUser } from '../hooks/useQueryUser';

export const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { data: user } = useQueryUser() || null;
  const dark = colorScheme === 'dark';
  return (
    <header className="p-6 bg-gray-800 text-white">
      <Container>
        <Title order={1}>PC Parts Picker</Title>
        {user ? (
          <>
            <Text size="lg">UserID: {user?.id}</Text>
            <Text size="lg">Name: {user?.name}</Text>
            <Text size="lg">Email: {user?.email}</Text>
          </>
        ) : (
          ''
          // <Text size="lg">ゲストユーザーとして閲覧中</Text>
        )}
        <Group mt="md">
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
      </Container>
    </header>
  );
};
