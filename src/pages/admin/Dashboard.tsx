import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Pending Bills</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">$0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;