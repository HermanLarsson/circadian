import {
  Button,
  Card,
  CardSection,
  NumberInput,
  RingProgress,
  Container,
  Text,
  Center,
  Box,
  Flex,
  Space,
} from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { useEffect, useState } from "react";

function SensorTable({ timeline, type }) {
  let unit;
  let maxValue;

  switch (type) {
    case "temperature":
      unit = "C";
      maxValue = 50;
      break;
    case "light":
      unit = "Lux";
      maxValue = 600;
      break;
    case "sound":
      unit = "dB";
      maxValue = 100;
      break;
    case "humidity":
      unit = "%";
      maxValue = 100;
      break;
  }

  return (
    <div>
      <Center>
        <h1>
          {type}({unit})
        </h1>
      </Center>
      <LineChart
        h={400}
        w="100%"
        data={timeline}
        series={[{ name: type, label: type }]}
        dataKey="time_recorded"
        withPointLabels
        strokeWidth={3}
        curveType="monotone"
        yAxisProps={{ domain: [0, maxValue] }}
        valueFormatter={(value) => `${value}`}
      />
      <Space h="xl"></Space>
    </div>
  );
}

export default SensorTable;
