import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Share2, ShoppingBag, Sparkles, TrendingUp, User, Search, Home as HomeIcon, Shirt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, recommendations, refreshRecommendations } = useApp();
  const [activeTab, setActiveTab] = useState('home');
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
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-neutral-600">Olá, Anna!</p>
            <p className="text-xs text-neutral-500">Seu estilo: Curvilínea Quente</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-neutral-100 rounded-lg">
            <Search className="w-5 h-5 text-neutral-700" />
          </button>
          <div className="relative">
            <button className="p-2 bg-neutral-100 rounded-lg">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
              <Sparkles className="w-5 h-5 text-neutral-700" />
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
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">Analise uma peça</h3>
              <p className="text-sm opacity-90">Descubra se combina com você</p>
            </div>
            <Camera className="w-8 h-8 opacity-80" />
          </div>
          <button 
            onClick={() => navigate('/analyze')}
            className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
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
            <p className="text-2xl font-bold text-neutral-900">78%</p>
            <p className="text-xs text-neutral-600">Acertos</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-neutral-900">47</p>
            <p className="text-xs text-neutral-600">Favoritos</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <ShoppingBag className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-neutral-900">12</p>
            <p className="text-xs text-neutral-600">Compras</p>
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
          <h2 className="text-xl font-bold text-neutral-900">Recomendado para você</h2>
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
                        : 'bg-white/80 text-neutral-700'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedItems.includes(rec.item.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-neutral-700">
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
                    <h3 className="font-semibold text-neutral-900">{rec.item.name}</h3>
                    <p className="text-sm text-neutral-600">{rec.item.brand}</p>
                  </div>
                  <p className="text-xl font-bold text-primary">
                    R$ {rec.item.price.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  {rec.reasons.map((reason, idx) => (
                    <p key={idx} className="text-sm text-neutral-600 flex items-center gap-2">
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
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 safe-bottom"
      >
        <div className="grid grid-cols-5 gap-1 p-2">
          {[
            { id: 'home', icon: HomeIcon, label: 'Início' },
            { id: 'search', icon: Search, label: 'Buscar' },
            { id: 'scan', icon: Camera, label: 'Scan' },
            { id: 'closet', icon: Shirt, label: 'Closet' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'scan') navigate('/analyze');
              }}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-primary bg-primary/10'
                  : 'text-neutral-500'
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default Home;