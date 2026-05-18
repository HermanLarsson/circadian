import { Avatar, Button, Paper, Text } from "@mantine/core";

export function UserCard({ user }) {
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar src="" size={120} radius={120} mx="auto" alt="Username" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {user.username}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.dob.slice(0, 10)}
      </Text>

      <Button variant="outline" color="grape" fullWidth mt="md">
        Log out
      </Button>
    </Paper>
  );
}
