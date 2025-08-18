import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Settings, AlertTriangle } from "lucide-react";

interface FirebaseSetupGuideProps {
  error: string;
}

export default function FirebaseSetupGuide({ error }: FirebaseSetupGuideProps) {
  const isConfigurationError = error.includes('operation-not-allowed') || error.includes('OPERATION_NOT_ALLOWED');

  if (!isConfigurationError) return null;

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-800">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Firebase Configuration Required
        </CardTitle>
        <CardDescription className="text-orange-700">
          Email/Password authentication is not enabled in your Firebase project.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-orange-200 bg-white">
          <Settings className="h-4 w-4" />
          <AlertTitle>Quick Setup Steps:</AlertTitle>
          <AlertDescription className="mt-2">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <strong>Firebase Console</strong></li>
              <li>Select your project: <strong>buzgo-68567</strong></li>
              <li>Navigate to <strong>Authentication → Sign-in method</strong></li>
              <li>Enable <strong>Email/Password</strong> authentication</li>
              <li>Also enable <strong>Firestore Database</strong> if not already enabled</li>
              <li>Save changes and refresh this page</li>
            </ol>
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => window.open('https://console.firebase.google.com/project/buzgo-68567/authentication/users', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Firebase Console
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
        
        <div className="text-sm text-orange-600">
          <strong>Note:</strong> This setup is required only once. After enabling authentication in Firebase Console, 
          the signup/login functionality will work normally.
        </div>
      </CardContent>
    </Card>
  );
}
