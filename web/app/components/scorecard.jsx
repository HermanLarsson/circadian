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
} from "@mantine/core";

function Scorecard(score, type) {
  function checkColor(score) {
    if (score >= 80) {
      return "green";
    } else if (score < 80 && score > 50) {
      return "yellow";
    } else {
      return "red";
    }
  }

  let unit;

  switch (score.type) {
    case "temperature":
      unit = "C";
      break;
    case "light":
      unit = "Lux";
      break;
    case "sound":
      unit = "dB";
      break;
    case "humidity":
      unit = "%";
      break;
  }

  return (
    <Card
      w={{ base: 200, sm: 200, lg: 300 }}
      withBorder
      orientation="horizontal"
    >
      <Card.Section
        w="100"
        withBorder
        inheritPadding
        px="xs"
        bg={checkColor(score.score)}
      >
        <Center>
          <h1>{score.score}</h1>
        </Center>
      </Card.Section>
      <Card.Section inheritPadding px="xs">
        <Box>
          <h2>{score.type}</h2>
          <Text fz="xl">
            Average: {score.avgValue} {unit}
          </Text>
        </Box>
      </Card.Section>
    </Card>
  );
}

export default Scorecard;
