import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, Home, FileText, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <Button variant="outline" onClick={logout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Welcome, Admin</h2>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Meters</CardTitle>
              <Settings className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Link to="/admin/customers/add">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Add Customer
              </Button>
            </Link>
            <Link to="/admin/meters/add">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Add Meter
              </Button>
            </Link>
            <Link to="/admin/meters">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Manage Meters
              </Button>
            </Link>
            <Link to="/admin/profile">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">No recent activity to display.</p>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between py-4">
            <Link to="/admin/dashboard" className="flex flex-col items-center text-primary">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/admin/customers" className="flex flex-col items-center text-gray-500 hover:text-primary">
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Consumers</span>
            </Link>
            <Link to="/admin/bills" className="flex flex-col items-center text-gray-500 hover:text-primary">
              <FileText className="h-5 w-5" />
              <span className="text-xs mt-1">Bills</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;