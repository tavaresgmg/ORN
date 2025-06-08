import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Share2, ShoppingBag, TrendingUp, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useNotifications } from '../hooks/useNotifications';
import BottomNavigation from '../components/BottomNavigation';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { recommendations, refreshRecommendations } = useApp();
  const { unreadCount } = useNotifications();
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const handleLike = (itemId: string) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom pb-20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" 
              alt="Anna" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-secondary">Olá, Anna!</p>
            <p className="text-xs text-secondary/70">Seu estilo: Curvilínea Quente</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/search')} className="p-2 bg-neutral-100 rounded-lg">
            <Search className="w-5 h-5 text-secondary" />
          </button>
          <div className="relative">
            <button onClick={() => navigate('/notifications')} className="p-2 bg-neutral-100 rounded-lg">
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-white text-xs flex items-center justify-center font-medium">
                  {unreadCount}
                </div>
              )}
              <Bell className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4"
      >
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-4 text-secondary">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">Analise uma peça</h3>
              <p className="text-sm opacity-90">Descubra se combina com você</p>
            </div>
            <Camera className="w-8 h-8 opacity-80" />
          </div>
          <button 
            onClick={() => navigate('/analyze')}
            className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors text-secondary"
          >
            Tirar foto agora
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-4 mb-6"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center">
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-secondary">78%</p>
            <p className="text-xs text-secondary/70">Acertos</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-secondary">47</p>
            <p className="text-xs text-secondary/70">Favoritos</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <ShoppingBag className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-secondary">12</p>
            <p className="text-xs text-secondary/70">Compras</p>
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      <div className="px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-4"
        >
          <h2 className="text-xl font-bold text-secondary">Recomendado para você</h2>
          <button 
            onClick={refreshRecommendations}
            className="text-sm text-primary font-medium"
          >
            Ver mais
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {recommendations.map((rec) => (
            <motion.div
              key={rec.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="relative">
                <img
                  src={rec.item.images[0]}
                  alt={rec.item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleLike(rec.item.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      likedItems.includes(rec.item.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-secondary'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedItems.includes(rec.item.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-secondary">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {rec.score}/10 match
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-secondary">{rec.item.name}</h3>
                    <p className="text-sm text-secondary/70">{rec.item.brand}</p>
                  </div>
                  <p className="text-xl font-bold text-primary">
                    R$ {rec.item.price.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  {rec.reasons.map((reason, idx) => (
                    <p key={idx} className="text-sm text-secondary/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {reason}
                    </p>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/item/${rec.item.id}`)}
                    className="btn-primary flex-1 py-3 text-sm"
                  >
                    Ver detalhes
                  </button>
                  <button className="btn-secondary flex-1 py-3 text-sm">
                    Try-on AR
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Home;