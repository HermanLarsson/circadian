import Alert from "../components/alert";
import UserSettings from "../components/userSettings";
import ReportDropdown from "../components/reportDropdown";
import { WelcomeBanner } from "../components/welcomeBanner";

export function meta() {
  return [
    { title: "Circadian" },
    { name: "description", content: "Welcome to Circadian!" },
  ];
}

export default function Home() {
  return (
    <div>
      <WelcomeBanner />
      <Alert />
      <ReportDropdown />
      <UserSettings />
    </div>
  );
}
