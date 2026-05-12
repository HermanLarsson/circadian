import UserSettings from "../components/userSettings";
import ReportDropdown from "../components/reportDropdown";

export function meta() {
  return [
    { title: "Circadian" },
    { name: "description", content: "Welcome to Circadian!" },
  ];
}

export default function Home() {
  return (
  <>
    <ReportDropdown />
    <UserSettings />
  </>
  );
}
