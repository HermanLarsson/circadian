import {
  TextInput,
  Container,
  Text,
  Button,
  Box,
  Center,
  Space,
} from "@mantine/core";
import { index } from "@react-router/dev/routes";
import { useState } from "react";
import { useNavigate } from "react-router";

export function meta() {
  return [
    { title: "Sign upto Circadian" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Signup() {
  const [wrongInfoError, setWrongInfoError] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(formData) {
    let signUpData = {
      username: formData.get("username"),
      password: formData.get("password"),
      fname: formData.get("fnfname"),
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }).then((res) => {
      if (res.status == 200) {
        navigate("/");
      } else if (res.status == 403) {
        setWrongInfoError(true);
      } else {
        alert("Unknown error happened on server!");
      }
    });
  }

  return (
    <div>
      <Container strategy="grid" size={400}>
        <Text fz="h2" ta="center">
          Log in to Circadian
        </Text>
        <Space h="md" />
        <Center>
          <Container w="50%">
            <form action={handleSubmit}>
              <TextInput name="username" label="Username" required={true} />
              <Space h="md" />
              <TextInput
                name="password"
                type="password"
                label="Password"
                required={true}
              />
              <Space h="md" />
              <Center>
                <Button type="submit">Log In</Button>
              </Center>
              {wrongInfoError && (
                <Text ta="center" color="red">
                  Invalid credentials
                </Text>
              )}
            </form>
          </Container>
        </Center>
      </Container>
    </div>
  );
}
