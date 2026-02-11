import React, { useState } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Image, Users } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Redirect to login if not authenticated or not an admin
  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  // Check if user is an admin
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ message: "You don't have admin privileges" }} />;
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (location.pathname.includes('/admin/popups')) {
      return 'popups';
    } else if (location.pathname.includes('/admin/users')) {
      return 'users';
    } else if (location.pathname.includes('/admin/contacts')) {
      return 'contacts';
    } else if (location.pathname.includes('/admin/faqs')) {
      return 'faqs';
    }
    return 'popups'; // Default tab
  };

  const handleTabChange = (value: string) => {
    if (value === 'popups') {
      navigate('/admin/popups');
    } else if (value === 'users') {
      navigate('/admin/users');
    } else if (value === 'contacts') {
      navigate('/admin/contacts');
    } else if (value === 'faqs') {
      navigate('/admin/faqs');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-blue-900 border-b border-blue-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Atandra Admin Dashboard</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="border-blue-400 text-blue-100 hover:bg-blue-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto py-6 px-4">
        <Tabs defaultValue={getActiveTab()} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="bg-blue-950/50 border border-blue-800/50">
            <TabsTrigger value="popups" className="data-[state=active]:bg-blue-700">
              <Image className="h-4 w-4 mr-2" />
              Popup Manager
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              User Submissions
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              Contact Submissions
            </TabsTrigger>
            <TabsTrigger value="faqs" className="data-[state=active]:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              FAQ Manager
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content Area */}
        <div className="bg-blue-950/20 border border-blue-800/30 rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
