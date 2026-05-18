import Alert from "../components/alert";
import UserSettings from "../components/userSettings";
import ReportDropdown from "../components/reportDropdown";
import { WelcomeBanner } from "../components/welcomeBanner";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta() {
  return [
    { title: "Circadian" },
    { name: "description", content: "Welcome to Circadian!" },
  ];
}

export default function Home() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch logged in users account details
    fetch(`http://localhost:3000/api/user`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (!data.username) {
          navigate("/login");
        }
      });
    setLoading(false);
  }, []);

  return (
    <div>
      {user && (
        <div>
          <WelcomeBanner user={user} />
          <Alert />
          <ReportDropdown />
          <UserSettings />
        </div>
      )}
    </div>
  );
}
