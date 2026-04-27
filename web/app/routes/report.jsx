import { useParams } from "react-router";
import { Welcome } from "../welcome/welcome";
import { useEffect } from "react";
import { Button, NumberInput } from "@mantine/core";

export function meta() {
  return [
    { title: "Report page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Report() {
  const params = useParams();
  let reportData = {};

  useEffect(() => {
    fetch("../api/report/" + params["date"])
      .then((res) => res.json())
      .then((data) => {
        reportData = data;
        console.log(reportData);
      });
  });

  return (
    <div>
      <span>Domnonic the guy </span>

      <Button>fhfhsdio</Button>
    </div>
  );
}
