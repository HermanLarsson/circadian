import { Button, Loader, Text, TextInput, Title } from "@mantine/core";
import classes from "./welcomeBanner.module.css";
import { UserCard } from "./userCard";
import { useEffect, useState } from "react";

// Basic customized mantine component to be displayed at the top of the landing page
export function WelcomeBanner({ user }) {
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
