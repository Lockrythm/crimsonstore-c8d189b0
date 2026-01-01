import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, Check, X, Trash2, Eye, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products as initialProducts, Product } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [productList, setProductList] = useState<Product[]>(initialProducts);

  const pendingProducts = productList.filter(p => p.status === "pending");
  const allProducts = productList.filter(p => p.status === "approved");

  const handleApprove = (id: string) => {
    setProductList(prev => 
      prev.map(p => p.id === id ? { ...p, status: "approved" as const } : p)
    );
    toast({
      title: "Item Approved",
      description: "The item is now visible in the marketplace.",
    });
  };

  const handleReject = (id: string) => {
    setProductList(prev => 
      prev.map(p => p.id === id ? { ...p, status: "rejected" as const } : p)
    );
    toast({
      title: "Item Rejected",
      description: "The seller will be notified.",
    });
  };

  const handleDelete = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Item Deleted",
      description: "The item has been removed from the marketplace.",
    });
  };

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
            {pendingProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <p>No items awaiting approval.</p>
              </motion.div>
            ) : (
              pendingProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="card-gothic p-4"
                >
                  <div className="flex gap-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-1">by {product.sellerName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={() => handleApprove(product.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check size={18} className="mr-1" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleReject(product.id)}
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <X size={18} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Inventory */}
          <TabsContent value="inventory" className="mt-4 space-y-3">
            {allProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * index }}
                className="card-gothic p-4"
              >
                <div className="flex gap-4 items-center">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
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
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
