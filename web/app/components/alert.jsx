import {
  IconTemperature,
  IconDroplet,
  IconSun,
  IconVolume,
} from "@tabler/icons-react";
import { Group, Loader, Paper, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

// used to map to the sensor to the right icon
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
          <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
            {alert.sensor}
          </Text>
          <Icon
            size={22}
            stroke={1.5}
            style={{ color: "var(--mantine-color-gray-4)" }}
          />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          {alert.value ? (
            <Text fz={24} fw={700} lh={1}>
              {alert.value.toFixed(1)}
            </Text>
          ) : (
            <Loader color="grey" size={22} />
          )}
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
            lh={1}
            style={{ display: "flex", alignItems: "center" }}
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
    <div style={{ padding: "calc(var(--mantine-spacing-xl) * 1.5)" }}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{alerts}</SimpleGrid>
    </div>
  );
}

export default Alert;
