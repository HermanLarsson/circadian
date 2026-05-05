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
  useEffect(() => {
    console.log(timeline);
    console.log(type);
  }, []);

  return (
    <div>
      <Center>
        <h1>{type}</h1>
      </Center>
      <LineChart
        h={500}
        w="100%"
        data={timeline}
        series={[{ name: type, label: type }]}
        dataKey="time_recorded"
        withPointLabels
        strokeWidth={3}
        curveType="natural"
        yAxisProps={{ domain: [0, 300] }}
        valueFormatter={(value) => `${value}`}
      />
      <Space h="xl"></Space>
    </div>
  );
}

export default SensorTable;
