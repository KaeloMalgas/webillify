import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

interface Meter {
  id: string;
  meterId: string;
  latitude: number;
  longitude: number;
  qrCode: string;
  assignedTo: string | null;
}

const ManageMeters = () => {
  const { toast } = useToast();
  // Mock data - replace with actual data fetching
  const meters: Meter[] = [
    {
      id: "1",
      meterId: "Meter_001",
      latitude: 40.7128,
      longitude: -74.0060,
      qrCode: "QR_001",
      assignedTo: "John Doe",
    },
    // Add more mock data as needed
  ];

  const handleDelete = (meterId: string) => {
    // TODO: Implement actual delete logic
    toast({
      title: "Meter Deleted",
      description: `Meter ${meterId} has been deleted.`,
    });
  };

  const handleEdit = (meterId: string) => {
    // TODO: Implement edit logic
    console.log("Edit meter:", meterId);
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="container mx-auto">
        <Link to="/admin/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Manage Meters</CardTitle>
            <Link to="/admin/meters/add">
              <Button>Add New Meter</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meter ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meters.map((meter) => (
                  <TableRow key={meter.id}>
                    <TableCell>{meter.meterId}</TableCell>
                    <TableCell>
                      {meter.latitude}, {meter.longitude}
                    </TableCell>
                    <TableCell>{meter.qrCode}</TableCell>
                    <TableCell>{meter.assignedTo || "Unassigned"}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(meter.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(meter.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageMeters;