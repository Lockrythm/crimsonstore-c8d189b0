import { motion } from "framer-motion";
import { User, Settings, LogOut, Package, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useUserProducts, ProductWithSeller } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, isAdmin, loading: authLoading, signOut } = useAuth();
  const { data: userListings = [], isLoading: loadingListings } = useUserProducts(user?.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="status-pending text-xs px-2 py-0.5 rounded-full">Pending</span>;
      case "approved":
        return <span className="status-approved text-xs px-2 py-0.5 rounded-full">Approved</span>;
      case "rejected":
        return <span className="status-rejected text-xs px-2 py-0.5 rounded-full">Rejected</span>;
      default:
        return null;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!authLoading && !user) {
    return (
      <AppLayout>
        <div className="p-4 space-y-6 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-gothic text-foreground">Sign In</h1>
          <p className="text-muted-foreground text-center">
            Sign in to view your profile and listings.
          </p>
          <Button 
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-crimson-glow"
          >
            Sign In
          </Button>
        </div>
      </AppLayout>
    );
  }

  if (authLoading) {
    return (
      <AppLayout>
        <div className="p-4 space-y-6">
          <Skeleton className="h-48 w-full bg-card" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-20 bg-card" />
            <Skeleton className="h-20 bg-card" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gothic p-6 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-muted-foreground" />
            )}
          </div>
          <h1 className="text-2xl font-gothic text-foreground mb-1">
            {profile?.username || user?.email?.split('@')[0] || 'Unknown'}
          </h1>
          <p className="text-sm text-muted-foreground">
            Member since {new Date(user?.created_at || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          
          {isAdmin && (
            <Link to="/admin">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-4 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm"
              >
                <Shield size={16} />
                Admin Dashboard
              </motion.div>
            </Link>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button variant="outline" className="card-gothic border-border h-auto py-4 flex flex-col gap-2">
            <Settings size={24} className="text-muted-foreground" />
            <span className="text-sm">Settings</span>
          </Button>
          <Button 
            variant="outline" 
            className="card-gothic border-border h-auto py-4 flex flex-col gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={24} className="text-muted-foreground" />
            <span className="text-sm">Sign Out</span>
          </Button>
        </motion.div>

        {/* My Listings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Package size={20} className="text-primary" />
            <h2 className="text-xl font-gothic text-foreground">My Listings</h2>
          </div>
          
          <div className="space-y-3">
            {loadingListings ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full bg-card" />
              ))
            ) : userListings.length > 0 ? (
              userListings.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card-gothic p-3 flex items-center gap-4"
                >
                  <img 
                    src={product.image_url || '/placeholder.svg'} 
                    alt={product.title} 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-foreground line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">${Number(product.price).toFixed(2)}</p>
                  </div>
                  {getStatusBadge(product.status)}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>You haven't listed any items yet.</p>
                <Link to="/sell">
                  <Button className="mt-4 bg-primary text-primary-foreground">
                    List Your First Item
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default Profile;
