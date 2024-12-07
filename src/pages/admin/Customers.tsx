import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminCustomers = () => {
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
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Customer list and management interface will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCustomers;