import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, User } from "lucide-react";

const ConsumerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> {user?.role}</p>
              <Button className="mt-4" variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Bills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No bills available yet.</p>
            {/* Bills will be displayed here once we integrate with Supabase */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Meter Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Upload New Reading
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Upload a photo of your meter reading for this month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerDashboard;