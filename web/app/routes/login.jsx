import { TextInput } from "@mantine/core";
import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "Log in to Circadian" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return (
    <div>
      <TextInput name="username"></TextInput>
    </div>
  );
}
