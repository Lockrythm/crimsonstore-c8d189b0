import { motion } from "framer-motion";
import { useEffect } from "react";
import { Shield, Check, X, Trash2, Eye, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePendingProducts, useAllApprovedProducts, useUpdateProductStatus, useDeleteProduct, ProductWithSeller } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  
  const { data: pendingProducts = [], isLoading: loadingPending } = usePendingProducts();
  const { data: allProducts = [], isLoading: loadingAll } = useAllApprovedProducts();
  const updateStatus = useUpdateProductStatus();
  const deleteProduct = useDeleteProduct();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast({
        title: "Item Deleted",
        description: "The item has been removed from the marketplace.",
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

  const ProductItem = ({ product, showActions }: { product: ProductWithSeller; showActions: boolean }) => (
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
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{product.title}</h3>
          <p className="text-sm text-muted-foreground">${Number(product.price).toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">by {product.profiles?.username || 'Unknown'}</p>
        </div>
      </div>
      {showActions ? (
        <div className="flex gap-2 mt-4">
          <Button 
            onClick={() => handleApprove(product.id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={updateStatus.isPending}
          >
            <Check size={18} className="mr-1" />
            Approve
          </Button>
          <Button 
            onClick={() => handleReject(product.id)}
            variant="outline"
            className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
            disabled={updateStatus.isPending}
          >
            <X size={18} className="mr-1" />
            Reject
          </Button>
        </div>
      ) : (
        <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Eye size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDelete(product.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            disabled={deleteProduct.isPending}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      )}
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

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card border border-border">
            <TabsTrigger 
              value="pending"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Pending ({pendingProducts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="inventory"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Inventory ({allProducts.length})
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
                <p>No items awaiting approval.</p>
              </motion.div>
            ) : (
              pendingProducts.map((product) => (
                <ProductItem key={product.id} product={product} showActions />
              ))
            )}
          </TabsContent>

          {/* Inventory */}
          <TabsContent value="inventory" className="mt-4 space-y-3">
            {loadingAll ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full bg-card" />
              ))
            ) : (
              allProducts.map((product) => (
                <ProductItem key={product.id} product={product} showActions={false} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
