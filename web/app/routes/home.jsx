import Alert from "../components/alert";
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
    <div>
      <h1>Circadian</h1>
      <Alert />
      <ReportDropdown />
      <UserSettings />
    </div>
  );
}
