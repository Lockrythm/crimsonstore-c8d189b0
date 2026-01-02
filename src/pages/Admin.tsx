import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Check, X, Trash2, Eye, ChevronLeft, Users, Package, Clock, Ban, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePendingProducts, useAllApprovedProducts, useRejectedProducts, useUpdateProductStatus, useDeleteProduct, ProductWithSeller } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface UserStats {
  totalUsers: number;
  totalProducts: number;
  pendingCount: number;
  rejectedCount: number;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<UserStats>({ totalUsers: 0, totalProducts: 0, pendingCount: 0, rejectedCount: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  
  const { data: pendingProducts = [], isLoading: loadingPending } = usePendingProducts();
  const { data: allProducts = [], isLoading: loadingAll } = useAllApprovedProducts();
  const { data: rejectedProducts = [], isLoading: loadingRejected } = useRejectedProducts();
  const updateStatus = useUpdateProductStatus();
  const deleteProduct = useDeleteProduct();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const [usersResult, productsResult] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('products').select('id, status')
        ]);
        
        const products = productsResult.data || [];
        setStats({
          totalUsers: usersResult.count || 0,
          totalProducts: products.length,
          pendingCount: products.filter(p => p.status === 'pending').length,
          rejectedCount: products.filter(p => p.status === 'rejected').length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
      setLoadingStats(false);
    };
    
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin, pendingProducts, allProducts, rejectedProducts]);

  const handleApprove = async (id: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: 'approved' });
      toast({
        title: "Item Approved",
        description: "The item is now visible in the marketplace.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to approve",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: 'rejected' });
      toast({
        title: "Item Rejected",
        description: "The seller will be notified.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to reject",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: 'pending' });
      toast({
        title: "Item Restored",
        description: "The item is back in pending review.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to restore",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast({
        title: "Item Deleted",
        description: "The item has been permanently removed.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to delete",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <AppLayout hideNav>
        <div className="p-4 space-y-6">
          <Skeleton className="h-8 w-48 bg-card" />
          <Skeleton className="h-64 w-full bg-card" />
        </div>
      </AppLayout>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-gothic p-4 flex items-center gap-3"
    >
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-foreground">{loadingStats ? '-' : value}</p>
      </div>
    </motion.div>
  );

  const ProductItem = ({ product, type }: { product: ProductWithSeller; type: 'pending' | 'approved' | 'rejected' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-gothic p-4"
    >
      <div className="flex gap-4">
        <img 
          src={product.image_url || '/placeholder.svg'} 
          alt={product.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-foreground truncate">{product.title}</h3>
            <Badge 
              variant={type === 'approved' ? 'default' : type === 'pending' ? 'secondary' : 'destructive'}
              className="shrink-0"
            >
              {type}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">${Number(product.price).toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">by {product.profiles?.username || 'Unknown'}</p>
          {product.categories && (
            <p className="text-xs text-primary mt-1">{product.categories.name}</p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        {type === 'pending' && (
          <>
            <Button 
              onClick={() => handleApprove(product.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              disabled={updateStatus.isPending}
              size="sm"
            >
              <Check size={16} className="mr-1" />
              Approve
            </Button>
            <Button 
              onClick={() => handleReject(product.id)}
              variant="outline"
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
              disabled={updateStatus.isPending}
              size="sm"
            >
              <X size={16} className="mr-1" />
              Reject
            </Button>
          </>
        )}
        
        {type === 'approved' && (
          <>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex-1 text-muted-foreground hover:text-foreground"
            >
              <Eye size={16} className="mr-1" />
              View
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleDelete(product.id)}
              className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
              disabled={deleteProduct.isPending}
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </>
        )}
        
        {type === 'rejected' && (
          <>
            <Button 
              onClick={() => handleRestore(product.id)}
              variant="outline"
              className="flex-1"
              disabled={updateStatus.isPending}
              size="sm"
            >
              <RotateCcw size={16} className="mr-1" />
              Restore
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleDelete(product.id)}
              className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
              disabled={deleteProduct.isPending}
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <AppLayout hideNav>
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="text-primary" size={28} />
            <h1 className="text-2xl font-gothic text-foreground">Admin Dashboard</h1>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Users} label="Users" value={stats.totalUsers} color="bg-primary" />
          <StatCard icon={Package} label="Products" value={stats.totalProducts} color="bg-green-600" />
          <StatCard icon={Clock} label="Pending" value={stats.pendingCount} color="bg-yellow-600" />
          <StatCard icon={Ban} label="Rejected" value={stats.rejectedCount} color="bg-destructive" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
            <TabsTrigger 
              value="pending"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs"
            >
              Pending ({pendingProducts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="inventory"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs"
            >
              Approved ({allProducts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="rejected"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs"
            >
              Rejected ({rejectedProducts.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Items */}
          <TabsContent value="pending" className="mt-4 space-y-3">
            {loadingPending ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full bg-card" />
              ))
            ) : pendingProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <Clock className="mx-auto mb-3 opacity-50" size={40} />
                <p>No items awaiting approval.</p>
              </motion.div>
            ) : (
              pendingProducts.map((product) => (
                <ProductItem key={product.id} product={product} type="pending" />
              ))
            )}
          </TabsContent>

          {/* Approved Inventory */}
          <TabsContent value="inventory" className="mt-4 space-y-3">
            {loadingAll ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full bg-card" />
              ))
            ) : allProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <Package className="mx-auto mb-3 opacity-50" size={40} />
                <p>No approved products yet.</p>
              </motion.div>
            ) : (
              allProducts.map((product) => (
                <ProductItem key={product.id} product={product} type="approved" />
              ))
            )}
          </TabsContent>

          {/* Rejected Items */}
          <TabsContent value="rejected" className="mt-4 space-y-3">
            {loadingRejected ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full bg-card" />
              ))
            ) : rejectedProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <Ban className="mx-auto mb-3 opacity-50" size={40} />
                <p>No rejected items.</p>
              </motion.div>
            ) : (
              rejectedProducts.map((product) => (
                <ProductItem key={product.id} product={product} type="rejected" />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
