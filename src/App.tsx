import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import AdminDashboard from "@/pages/admin/Dashboard";
import ConsumerDashboard from "@/pages/consumer/Dashboard";
import AddCustomer from "@/pages/admin/AddCustomer";
import ManageMeters from "@/pages/admin/ManageMeters";
import AddMeter from "@/pages/admin/AddMeter";
import AdminProfile from "@/pages/admin/Profile";
import AdminCustomers from "@/pages/admin/Customers";
import AdminBills from "@/pages/admin/Bills";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-white">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/customers/add" element={<AddCustomer />} />
                <Route path="/admin/customers" element={<AdminCustomers />} />
                <Route path="/admin/meters" element={<ManageMeters />} />
                <Route path="/admin/meters/add" element={<AddMeter />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/bills" element={<AdminBills />} />
                <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
                <Route path="/dashboard" element={<ConsumerDashboard />} /> {/* Added this route as a fallback */}
                <Route path="/" element={<Index />} />
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;