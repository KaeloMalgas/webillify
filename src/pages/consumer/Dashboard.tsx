import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, User, Download, History } from "lucide-react";
import MeterPhotoUpload from "@/components/MeterPhotoUpload";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const ConsumerDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedBill, setSelectedBill] = useState<string | null>(null);

  // Mock data - will be replaced with actual data from backend
  const previousBills = [
    {
      id: "1",
      month: "January 2024",
      reading: 1234,
      consumption: 150,
      amount: 690.00,
      status: "Validated",
      imageUrl: "/meter-images/jan2024.jpg",
      pdfUrl: "/bills/jan2024.pdf"
    },
    // ... more bills
  ];

  const registeredLocation = {
    latitude: 0,
    longitude: 0
  };

  const handlePhotoUploaded = (photoUrl: string, gpsVerified: boolean) => {
    if (gpsVerified) {
      // TODO: Implement OCR reading detection
      console.log("Photo uploaded and verified:", photoUrl);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>

      <Tabs defaultValue="bills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="bills">Previous Bills</TabsTrigger>
          <TabsTrigger value="upload">Upload Reading</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="bills">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Previous Bills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Reading</TableHead>
                    <TableHead>Consumption</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previousBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.month}</TableCell>
                      <TableCell>{bill.reading} kWh</TableCell>
                      <TableCell>{bill.consumption} units</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>{bill.status}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Bill
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            Image
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input 
                      type="text"
                      className="w-full p-2 mt-1 border rounded-md bg-gray-100"
                      value={user?.name || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email"
                      className="w-full p-2 mt-1 border rounded-md bg-gray-100"
                      value={user?.email || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Electric Meter ID</label>
                    <input 
                      type="text"
                      className="w-full p-2 mt-1 border rounded-md bg-gray-100"
                      value={user?.meterId || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mobile</label>
                    <input 
                      type="tel"
                      className="w-full p-2 mt-1 border rounded-md"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
                <Button className="mt-4">
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsumerDashboard;