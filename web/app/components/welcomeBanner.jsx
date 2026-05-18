import { Button, Loader, Text, TextInput, Title } from "@mantine/core";
import classes from "./welcomeBanner.module.css";
import { UserCard } from "./userCard";
import { useEffect, useState } from "react";

export function WelcomeBanner() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:3000/api/user`);
      const userData = await res.json();

      console.log(userData);
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) return <Loader color="grape" />;

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Welcome, {user.fname}!</Title>
        <Text fw={500} fz="lg" mb={5}>
          Your sleep environment, made visible.
        </Text>
        <Text fz="sm" c="dimmed">
          Monitor the temperature, humidity, light, and sound around you so you
          can understand what's affecting your sleep and wake up feeling better.
          For more tips and recommendations, subscribe to our newsletter!
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
            radius="md"
            size="md"
          />
          <Button
            className={classes.control}
            radius="md"
            size="md"
            variant="light"
            color="grape"
          >
            Subscribe
          </Button>
        </div>
      </div>
      <UserCard user={user} />
    </div>
  );
}
