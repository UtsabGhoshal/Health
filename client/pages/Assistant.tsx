import PlaceholderPage from "@/components/PlaceholderPage";
import { Bot } from "lucide-react";

export default function Assistant() {
  const features = [
    "AI-powered symptom analysis",
    "Personalized health recommendations",
    "Medicine information and interactions",
    "Health risk assessments",
    "Recovery progress tracking",
    "24/7 health support chat",
    "Emergency situation guidance",
    "Wellness tips and reminders"
  ];

  return (
    <PlaceholderPage
      title="AI Health Assistant"
      description="Get intelligent health insights and personalized recommendations. Our AI assistant analyzes your symptoms and provides expert guidance for better health decisions."
      icon={Bot}
      features={features}
    />
  );
}
