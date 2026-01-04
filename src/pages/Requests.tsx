import { motion } from "framer-motion";
import { ArrowLeft, Plus, MessageSquare, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useRequests, useCreateRequest, useDeleteRequest } from "@/hooks/useRequests";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";

const Requests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: requests = [], isLoading } = useRequests();
  const createRequest = useCreateRequest();
  const deleteRequest = useDeleteRequest();
  
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to submit a request");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    try {
      await createRequest.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        user_id: user.id,
      });
      
      toast.success("Request submitted successfully!");
      setTitle("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to submit request");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRequest.mutateAsync(id);
      toast.success("Request deleted");
    } catch (error) {
      toast.error("Failed to delete request");
    }
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-gothic text-foreground">Requests</h1>
          </div>
          
          {user && (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              size="sm"
            >
              <Plus size={18} className="mr-1" />
              New
            </Button>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground"
        >
          Request items, books, or services you're looking for. Others can see your requests and may offer what you need!
        </motion.p>

        {/* New Request Form */}
        {showForm && user && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="card-gothic p-4 space-y-4"
          >
            <h2 className="text-lg font-gothic text-foreground">Submit a Request</h2>
            
            <Input
              placeholder="What are you looking for?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary border-border text-foreground"
              maxLength={100}
            />
            
            <Textarea
              placeholder="Add more details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary border-border text-foreground min-h-[80px]"
              maxLength={500}
            />
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createRequest.isPending}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {createRequest.isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </motion.form>
        )}

        {/* Sign in prompt */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-gothic p-6 text-center"
          >
            <MessageSquare size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">Sign in to submit your own requests</p>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Sign In
            </Button>
          </motion.div>
        )}

        {/* Requests List */}
        <div className="space-y-3">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full bg-card" />
            ))
          ) : requests.length > 0 ? (
            requests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="card-gothic p-4"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="text-foreground font-medium">{request.title}</h3>
                    {request.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {request.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        request.status === 'open' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {request.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {user?.id === request.user_id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(request.id)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <Trash2 size={18} />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-muted-foreground"
            >
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p>No requests yet. Be the first to ask!</p>
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Requests;
