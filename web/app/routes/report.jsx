import { useParams } from "react-router";
import { Welcome } from "../welcome/welcome";
import { useEffect, useState } from "react";
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
import Scorecard from "../components/scorecard";
import SensorTable from "../components/sensorTable";

export function meta() {
  return [
    { title: "Report page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Report() {
  const params = useParams();
  const [reportData, setReportData] = useState({});
  const [chosenSensor, setChosenSensor] = useState();
  const [timelines, setTimelines] = useState({})

  useEffect(() => {
    fetch("../api/report/" + params["date"])
      .then((res) => res.json())
      .then((data) => {
        setReportData(data);
       // console.log("Data fetched, reportData updated with:");
       // console.log(data["timelines"]);

    

      });
  }, []);

  

  return (
    <div>
      <Text>{chosenSensor}</Text>
      <Container size={1500}>
        <h1>Report: {params["date"]}</h1>
        {reportData["scores"] && (
          <Flex justify="space-between" rowGap="md" wrap="wrap">
            <Scorecard score={reportData["scores"]["sound"]} type="Sound" />
            <Scorecard
              score={reportData["scores"]["temperature"]}
              type="Temp."
            />
            <Scorecard
              score={reportData["scores"]["humidity"]}
              type="Humidity"
            />
            <Scorecard score={reportData["scores"]["light"]} type="Light" />
          </Flex>
        )}
        <Space h="xl"></Space>
      {/*}  {reportData["timelines"] &&
            <LineChart
          h={500}
          data={reportData["timelines"]["light"]}
          series={[
            { name: "light", label: "Light" },
          ]}
          dataKey="time_recorded"
          withPointLabels
          strokeWidth={3}
          curveType="natural"
          yAxisProps={{ domain: [-10, 160] }}
          valueFormatter={(value) => `${value}`}
        /> } */}
          {reportData["timelines"] &&<div> <SensorTable timeline={reportData["timelines"]["light"]} type="light"/>
         <SensorTable timeline={reportData["timelines"]["sound"]} type="sound"/>
         <SensorTable timeline={reportData["timelines"]["temperature"]} type="temperature"/>
         <SensorTable timeline={reportData["timelines"]["humidity"]} type="humidity"/>
         </div>}
        <Space h="xl"/>

      </Container>
    </div>
  );
}
