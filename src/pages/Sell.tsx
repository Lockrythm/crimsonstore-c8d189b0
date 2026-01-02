import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, DollarSign, Tag, FileText, Image } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { useCreateProduct } from "@/hooks/useProducts";
import { uploadProductImage } from "@/lib/storage";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Sell = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data: categories = [] } = useCategories();
  const createProduct = useCreateProduct();
  
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list an item.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!formData.title || !formData.price || !formData.category || !formData.description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let imageUrl = '';
      
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile, user.id);
      }
      
      // Determine product type based on category
      const selectedCat = categories.find(c => c.id === formData.category);
      const bookSlugs = ['vampiric-lore', 'grimoires', 'alchemy', 'medical-texts'];
      const productType = selectedCat && bookSlugs.includes(selectedCat.slug) ? 'book' : 'item';
      
      await createProduct.mutateAsync({
        seller_id: user.id,
        category_id: formData.category,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: imageUrl,
        type: productType,
      });
      
      toast({
        title: "Item sent to the Coven",
        description: "Your listing is pending approval from the elders.",
      });
      
      setFormData({ title: "", price: "", category: "", description: "" });
      setImagePreview(null);
      setImageFile(null);
    } catch (error: any) {
      toast({
        title: "Failed to create listing",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authLoading && !user) {
    return (
      <AppLayout>
        <div className="p-4 space-y-6 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-gothic text-foreground">Sign in to Sell</h1>
          <p className="text-muted-foreground text-center">
            You need to be signed in to list items for sale.
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

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-gothic text-foreground mb-2">Sell an Item</h1>
          <p className="text-muted-foreground text-sm">
            List your treasures for fellow creatures of the night
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm text-muted-foreground mb-2">
              Item Image
            </label>
            <div 
              className="card-gothic aspect-square flex flex-col items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Image className="text-muted-foreground mb-2" size={48} />
                  <p className="text-muted-foreground text-sm">Tap to upload</p>
                </>
              )}
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm text-muted-foreground mb-2">
              <FileText size={14} className="inline mr-1" /> Title
            </label>
            <Input
              placeholder="What arcane artifact are you selling?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-card border-border focus:border-primary"
              required
            />
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm text-muted-foreground mb-2">
              <DollarSign size={14} className="inline mr-1" /> Price
            </label>
            <Input
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="bg-card border-border focus:border-primary"
              required
            />
          </motion.div>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm text-muted-foreground mb-2">
              <Tag size={14} className="inline mr-1" /> Category
            </label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm text-muted-foreground mb-2">
              Description
            </label>
            <Textarea
              placeholder="Describe your item in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-card border-border focus:border-primary min-h-[120px]"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-crimson-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Upload className="mr-2 animate-pulse" size={18} />
                  Sending to the Coven...
                </>
              ) : (
                <>
                  <Upload className="mr-2" size={18} />
                  Submit for Approval
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </AppLayout>
  );
};

export default Sell;
