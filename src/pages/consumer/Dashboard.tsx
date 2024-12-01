import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, User, Download } from "lucide-react";
import MeterPhotoUpload from "@/components/MeterPhotoUpload";

const ConsumerDashboard = () => {
  const { user, logout } = useAuth();

  // Placeholder data - will be replaced with actual data from Supabase
  const registeredLocation = {
    latitude: 0,
    longitude: 0
  };

  const handlePhotoUploaded = (photoUrl: string, gpsVerified: boolean) => {
    // This will be implemented with Supabase integration
    console.log("Photo uploaded:", photoUrl, "GPS verified:", gpsVerified);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="bills">Previous Bills</TabsTrigger>
          <TabsTrigger value="upload">Upload Reading</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input 
                    type="text"
                    className="w-full p-2 mt-1 border rounded-md"
                    defaultValue={user?.name}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email"
                    className="w-full p-2 mt-1 border rounded-md"
                    defaultValue={user?.email}
                    disabled={true}
                  />
                </div>
                <Button className="mt-4" variant="outline">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Previous Bills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {/* This will be populated with actual bills from Supabase */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">January 2024</h3>
                      <p className="text-sm text-gray-500">Reading: 1234 kWh</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Bill PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Meter Photo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Meter Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MeterPhotoUpload 
                onPhotoUploaded={handlePhotoUploaded}
                registeredLocation={registeredLocation}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsumerDashboard;