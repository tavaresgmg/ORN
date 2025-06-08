import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Bell, 
  Heart, 
  ShoppingBag, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Camera,
  Palette,
  Ruler,
  Star,
  Crown,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import BottomNavigation from '../components/BottomNavigation';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useApp();

  const menuItems = [
    {
      section: 'Meu Estilo',
      items: [
        {
          icon: Palette,
          label: 'Minha Paleta de Cores',
          value: userProfile?.colorPalette?.name || 'Quente',
          color: 'text-orange-500',
          onClick: () => navigate('/profile/colors')
        },
        {
          icon: Ruler,
          label: 'Tipo de Corpo',
          value: userProfile?.bodyType?.name || 'Curvilínea',
          color: 'text-purple-500',
          onClick: () => navigate('/profile/body-type')
        },
        {
          icon: BookOpen,
          label: 'Método Kibbe',
          value: 'Aprenda mais',
          color: 'text-indigo-500',
          onClick: () => navigate('/kibbe-guide')
        }
      ]
    },
    {
      section: 'Atividade',
      items: [
        {
          icon: Heart,
          label: 'Favoritos',
          value: '47 itens',
          color: 'text-red-500',
          onClick: () => navigate('/favorites')
        },
        {
          icon: ShoppingBag,
          label: 'Histórico de Compras',
          value: '12 compras',
          color: 'text-green-500',
          onClick: () => navigate('/purchases')
        }
      ]
    },
    {
      section: 'Configurações',
      items: [
        {
          icon: Bell,
          label: 'Notificações',
          value: 'Ativadas',
          color: 'text-blue-500',
          onClick: () => navigate('/notifications')
        },
        {
          icon: Settings,
          label: 'Configurações',
          value: '',
          color: 'text-secondary/60',
          onClick: () => navigate('/settings')
        },
        {
          icon: HelpCircle,
          label: 'Ajuda e Suporte',
          value: '',
          color: 'text-secondary/60',
          onClick: () => navigate('/help')
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-primary to-primary-dark p-6 pb-12"
      >
        <h1 className="text-white text-xl font-bold mb-6">Meu Perfil</h1>
        
        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-primary" />
              </button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">Anna Silva</h2>
              <p className="text-white/80 text-sm">@anna.silva</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Premium
                </div>
                <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
                  Nível 3
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 -mt-6"
      >
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="grid grid-cols-3 divide-x divide-neutral-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">78%</p>
              <p className="text-xs text-secondary/70">Acertos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">234</p>
              <p className="text-xs text-secondary/70">Análises</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">4.8</p>
              <p className="text-xs text-secondary/70 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                Rating
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="px-6 mt-6 space-y-6">
        {menuItems.map((section, sectionIndex) => (
          <motion.div
            key={section.section}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + sectionIndex * 0.1 }}
          >
            <h3 className="text-sm font-medium text-secondary/50 mb-3">{section.section}</h3>
            <div className="bg-white rounded-xl overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors ${
                    index < section.items.length - 1 ? 'border-b border-neutral-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-secondary">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-sm text-secondary/70">{item.value}</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-secondary/40" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate('/')}
          className="w-full bg-white rounded-xl p-4 flex items-center justify-center gap-3 text-red-500 font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </motion.button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;