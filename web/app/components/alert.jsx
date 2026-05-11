import {
  IconTemperature,
  IconDroplet,
  IconSun,
  IconVolume,
} from "@tabler/icons-react";
import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import classes from "./Alerts.module.css";
import { useEffect, useState } from "react";

const icons = {
  temperature: IconTemperature,
  humidity: IconDroplet,
  light: IconSun,
  sound: IconVolume,
};

// TODO: Currently hardcoded
// const allAlerts = {
//   temperature: {
//     sensor: "temperature",
//     value: 16,
//     unit: "°C",
//     status: "good",
//     message: "Room temperature is within the optimal level",
//     recommendation: "You're perfectly set up for a great sleep",
//   },
//   humidity: {
//     sensor: "humidity",
//     value: 35,
//     unit: "%",
//     status: "good",
//     message: "Room humidity is within the optimal level",
//     recommendation: "You're perfectly set up for a great sleep",
//   },
//   light: {
//     sensor: "light",
//     value: 250,
//     unit: "lux",
//     status: "bad",
//     message: "Room light is 240 lux above the optimal level",
//     recommendation: "Time to lower the lights and close the curtains",
//   },
//   sound: {
//     sensor: "sound",
//     value: null,
//     unit: "dB",
//     status: "pending",
//     message: "Awaiting readings....",
//     recommendation: "Analyzing room...",
//   },
// };

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function Alert() {
  const [allAlerts, setAllAlerts] = useState(null);

  useEffect(() => {
    const fetchAllAlerts = async () => {
      const res = await fetch("http://localhost:3000/api/alerts");
      const data = await res.json();
      console.log("DATA: ", data);

      setAllAlerts(data);
    };

    fetchAllAlerts();
    const interval = setInterval(fetchAllAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!allAlerts) return <Text>Waiting for sensor data...</Text>;

  const alerts = Object.values(allAlerts).map((alert) => {
    const Icon = icons[alert.sensor];

    return (
      <Paper withBorder p="md" radius="md" key={alert.sensor}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.sensor}>
            {capitalize(alert.sensor)}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>
            {alert.value.toFixed(1)} {alert.unit}
          </Text>
          <Text
            c={
              alert.status == "good"
                ? "teal"
                : alert.status == "pending"
                  ? "yellow"
                  : "red"
            }
            fz="sm"
            fw={500}
            className={classes.status}
          >
            <span>{alert.status.toUpperCase()}</span>
          </Text>
        </Group>

        <Text fz="s" mt={7}>
          {alert.message}
        </Text>
        <Text fz="xs" c="dimmed" mt={7}>
          {alert.recommendation}
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{alerts}</SimpleGrid>
    </div>
  );
}

export default Alert;
