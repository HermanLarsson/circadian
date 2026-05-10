import {
  TextInput,
  Container,
  Text,
  Button,
  Box,
  Center,
  Space,
} from "@mantine/core";

export function meta() {
  return [
    { title: "Log in to Circadian" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return (
    <div>
      <Container strategy="grid" size={400}>
        <Text fz="h2" ta="center">
          Log in to Circadian
        </Text>
        <Space h="md" />
        <Center>
          <Container w="50%">
            <form>
              <TextInput name="username" label="Username" />
              <Space h="md" />
              <TextInput name="password" label="Password" />
              <Space h="md" />
              <Center>
                <Button type="submit">Log In</Button>
              </Center>
            </form>
          </Container>
        </Center>
      </Container>
    </div>
  );
}
