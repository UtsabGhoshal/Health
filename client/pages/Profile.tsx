import PlaceholderPage from "@/components/PlaceholderPage";
import { User } from "lucide-react";

export default function Profile() {
  const features = [
    "Personal information management",
    "Health preferences and goals",
    "Emergency contacts setup",
    "Insurance information",
    "Privacy and security settings",
    "Notification preferences",
    "Account verification",
    "Data export and backup"
  ];

  return (
    <PlaceholderPage
      title="Profile & Settings"
      description="Manage your personal information, health preferences, and account settings. Customize your healthcare experience to match your needs."
      icon={User}
      features={features}
    />
  );
}
