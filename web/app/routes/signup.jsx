import {
  TextInput,
  Container,
  Text,
  Button,
  Box,
  Center,
  Space,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
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
  const [signUpErrors, setSignUpErrors] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  let navigate = useNavigate();

  function handleSubmit(formData) {
    let signUpData = {
      username: formData.get("username"),
      password: formData.get("password"),
      passwordCheck: formData.get("passwordCheck"),
      fname: formData.get("fname"),
      mname: formData.get("mname"),
      lname: formData.get("lname"),
      dob: formData.get("dob"),
    };

    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    }).then((res) => {
      if (res.status == 200) {
        setSignUpSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (res.status == 403) {
        res.json().then((data) => {
          let errorString = "";
          for (const error of data) {
            errorString += "\n -" + error;
          }
          setSignUpErrors(errorString);
        });
      } else {
        alert("Unknown error happened on server!");
      }
    });
  }

  return (
    <div>
      <Container strategy="grid" size={400}>
        <Text fz="h2" ta="center">
          Sign up to Circadian
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
              <TextInput
                name="passwordCheck"
                type="password"
                label="Repeat Password"
                required={true}
              />
              <Space h="md" />
              <TextInput name="fname" label="First Name" required={true} />
              <Space h="md" />
              <TextInput name="mname" label="Middle Name" required={true} />
              <Space h="md" />
              <TextInput name="lname" label="Last Name" required={true} />
              <Space h="md" />
              <DateInput
                name="dob"
                valueFormat="YYYY MMM DD"
                label="Date of birth"
                placeholder="Date of birth"
                valueFormat="YYYY-MM-DD"
                required={true}
              />
              <Space h="md" />
              <Center>
                <Button type="submit">Sign up</Button>
              </Center>
              {signUpSuccess && (
                <Text ta="center" color="green">
                  Signed up successfully! Redirecting...
                </Text>
              )}
            </form>
          </Container>
        </Center>
      </Container>
      <Container>
        {signUpErrors && (
          <Text ta="center" color="red">
            {signUpErrors}
          </Text>
        )}
      </Container>
    </div>
  );
}
