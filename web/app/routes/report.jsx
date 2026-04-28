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
import Scorecard from "../components/scorecard";

export function meta() {
  return [
    { title: "Report page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Report() {
  const params = useParams();
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    fetch("../api/report/" + params["date"])
      .then((res) => res.json())
      .then((data) => {
        setReportData(data);
        console.log("Data fetched, reportData updated with:");
        console.log(reportData);
      });
  }, []);

  return (
    <div>
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
      </Container>
    </div>
  );
}
