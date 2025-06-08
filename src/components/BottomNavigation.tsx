import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Camera, Shirt, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', icon: Home, label: 'Início', path: '/home' },
    { id: 'search', icon: Search, label: 'Buscar', path: '/search' },
    { id: 'scan', icon: Camera, label: 'Scan', path: '/analyze' },
    { id: 'closet', icon: Shirt, label: 'Closet', path: '/closet' },
    { id: 'profile', icon: User, label: 'Perfil', path: '/profile' }
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    const tab = tabs.find(t => t.path === currentPath);
    return tab?.id || 'home';
  };

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 safe-bottom z-50"
    >
      <div className="grid grid-cols-5 gap-1 p-2">
        {tabs.map((tab) => {
          const isActive = getActiveTab() === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-secondary bg-primary/10'
                  : 'text-neutral-500'
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;