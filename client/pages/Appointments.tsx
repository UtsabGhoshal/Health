import PlaceholderPage from "@/components/PlaceholderPage";
import { Calendar } from "lucide-react";

export default function Appointments() {
  const features = [
    "View all your upcoming appointments",
    "Reschedule or cancel appointments",
    "Receive appointment reminders",
    "Virtual consultation support",
    "Appointment history and records",
    "Calendar integration"
  ];

  return (
    <PlaceholderPage
      title="Appointments"
      description="Manage all your medical appointments in one place. Schedule, reschedule, and track your healthcare visits with ease."
      icon={Calendar}
      features={features}
    />
  );
}
