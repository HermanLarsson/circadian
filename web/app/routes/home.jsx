//import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "Circadian" },
    { name: "description", content: "Welcome to Circadian!" },
  ];
}

export default function Home() {
  return <userSettings />;
}
