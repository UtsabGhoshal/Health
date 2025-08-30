import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, AlertTriangle } from "lucide-react";

interface FirebaseSetupGuideProps {
  error: string;
}

export default function FirebaseSetupGuide({ error }: FirebaseSetupGuideProps) {
  const lowered = (error || "").toLowerCase();
  const isConfigurationError =
    lowered.includes("operation-not-allowed") ||
    lowered.includes("invalid-api-key") ||
    lowered.includes("firebase is not configured");

  if (!isConfigurationError) return null;

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-800">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Firebase configuration required
        </CardTitle>
        <CardDescription className="text-orange-700">
          Provide your Firebase Web App credentials and enable Authentication/Firestore.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-orange-200 bg-white">
          <Settings className="h-4 w-4" />
          <AlertTitle>Setup steps</AlertTitle>
          <AlertDescription className="mt-2">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>In Firebase Console, create or open your project and add a Web app to get config.</li>
              <li>Send the following env vars so we can set them securely: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID, VITE_FIREBASE_MEASUREMENT_ID (optional).</li>
              <li>Enable Email/Password under Authentication and create a Firestore database.</li>
              <li>Refresh this page after saving changes.</li>
            </ol>
          </AlertDescription>
        </Alert>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
        <div className="text-sm text-orange-600">
          After configuring, login and signup will work normally.
        </div>
      </CardContent>
    </Card>
  );
}
