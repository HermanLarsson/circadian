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
  //console.log(score);

  function checkColor(score) {
    if (score >= 80) {
      return "green";
    } else if (score < 80 && score > 50) {
      return "yellow";
    } else {
      return "red";
    }
  }

  return (
    <Card
      w={{ base: 200, sm: 200, lg: 250 }}
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
          <Text fz="xl">200 dB</Text>
        </Box>
      </Card.Section>
    </Card>
  );
}

export default Scorecard;
