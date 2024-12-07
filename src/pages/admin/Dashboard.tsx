import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, Home, FileText, LogOut, Plus, List } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeMeters: 0,
    totalBills: 0
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
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
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Meters</CardTitle>
              <Settings className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeMeters}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBills}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/admin/customers/add">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Plus className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-semibold">Add Customer</div>
                  <div className="text-sm text-gray-500">Register a new customer</div>
                </div>
              </Button>
            </Link>
            <Link to="/admin/meters/add">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Settings className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-semibold">Add Meter</div>
                  <div className="text-sm text-gray-500">Register a new meter</div>
                </div>
              </Button>
            </Link>
            <Link to="/admin/meters">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <List className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-semibold">Manage Meters</div>
                  <div className="text-sm text-gray-500">View and manage meters</div>
                </div>
              </Button>
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">New customer registered</p>
                    <p className="text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Bill generated</p>
                    <p className="text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
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
              <span className="text-xs mt-1">Customers</span>
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