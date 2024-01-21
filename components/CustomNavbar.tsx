import React from 'react';
import { Navbar, Text, Stack, Button } from '@mantine/core';
import {
  IconDashboard,
  IconSettings,
  IconLogout,
  IconList,
} from '@tabler/icons';

const CustomNavbar = ({ opened }) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow>
        <Stack spacing="xs">
          <Button variant="subtle" fullWidth>
            <IconDashboard size={20} />
            <Text size="sm" ml="xs">
              Dashboard
            </Text>
          </Button>
          <Button variant="subtle" fullWidth>
            <IconList size={20} />
            <Text size="sm" ml="xs">
              My Parts List
            </Text>
          </Button>
          <Button variant="subtle" fullWidth>
            <IconSettings size={20} />
            <Text size="sm" ml="xs">
              Settings
            </Text>
          </Button>
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Button variant="subtle" fullWidth>
          <IconLogout size={20} />
          <Text size="sm" ml="xs">
            Logout
          </Text>
        </Button>
      </Navbar.Section>
    </Navbar>
  );
};

export default CustomNavbar;
