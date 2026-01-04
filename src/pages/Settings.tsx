import { motion } from "framer-motion";
import { ArrowLeft, User, Bell, Shield, Palette, HelpCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const settingsSections = [
    {
      title: "Account",
      icon: User,
      items: [
        { label: "Edit Profile", action: () => {} },
        { label: "Change Password", action: () => {} },
        { label: "Email: " + (user?.email || "Not set"), action: () => {} },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { 
          label: "Push Notifications", 
          toggle: true, 
          value: notifications, 
          onChange: setNotifications 
        },
      ],
    },
    {
      title: "Appearance",
      icon: Palette,
      items: [
        { 
          label: "Dark Mode", 
          toggle: true, 
          value: darkMode, 
          onChange: setDarkMode 
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { label: "Privacy Policy", action: () => {} },
        { label: "Terms of Service", action: () => {} },
      ],
    },
    {
      title: "Support",
      icon: HelpCircle,
      items: [
        { label: "Help Center", action: () => {} },
        { label: "Contact Support", action: () => {} },
        { label: "Report a Problem", action: () => {} },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-gothic text-foreground">Settings</h1>
        </motion.div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * sectionIndex }}
            className="card-gothic p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <section.icon size={20} className="text-primary" />
              <h2 className="text-lg font-gothic text-foreground">{section.title}</h2>
            </div>
            
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={item.toggle ? undefined : item.action}
                >
                  <span className="text-sm text-foreground">{item.label}</span>
                  {item.toggle && (
                    <Switch
                      checked={item.value}
                      onCheckedChange={item.onChange}
                      className="data-[state=checked]:bg-primary"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground py-4"
        >
          Crimson Marketplace v1.0.0
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Settings;
