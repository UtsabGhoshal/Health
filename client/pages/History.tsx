import PlaceholderPage from "@/components/PlaceholderPage";
import { FileText } from "lucide-react";

export default function History() {
  const features = [
    "Complete digital medical records",
    "Upload and store medical reports",
    "Track medications and treatments",
    "Share records with doctors securely",
    "Medical timeline visualization",
    "Health metrics tracking",
    "Family medical history",
    "Insurance and billing records"
  ];

  return (
    <PlaceholderPage
      title="Medical History"
      description="Keep your complete medical history organized and accessible. Store reports, track treatments, and share information securely with healthcare providers."
      icon={FileText}
      features={features}
    />
  );
}
