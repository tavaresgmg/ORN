import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Camera, Filter, Grid, List, Heart, Trash2, Home, Search, User, Shirt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClosetItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  color: string;
  brand: string;
  size: string;
  image: string;
  favorite: boolean;
  tags: string[];
  addedAt: Date;
}

const mockClosetItems: ClosetItem[] = [
  {
    id: '1',
    name: 'Camisa Branca',
    category: 'tops',
    color: 'Branco',
    brand: 'Zara',
    size: 'M',
    image: 'https://images.unsplash.com/photo-1589902860314-e910697dea18?w=400',
    favorite: true,
    tags: ['básico', 'trabalho', 'versátil'],
    addedAt: new Date()
  },
  {
    id: '2',
    name: 'Calça Jeans',
    category: 'bottoms',
    color: 'Azul',
    brand: 'C&A',
    size: '38',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
    favorite: false,
    tags: ['casual', 'dia a dia'],
    addedAt: new Date()
  },
  {
    id: '3',
    name: 'Vestido Floral',
    category: 'dresses',
    color: 'Estampado',
    brand: 'Renner',
    size: 'M',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
    favorite: true,
    tags: ['festa', 'romântico'],
    addedAt: new Date()
  }
];

const categories = [
  { id: 'all', name: 'Tudo', icon: '👗' },
  { id: 'tops', name: 'Blusas', icon: '👚' },
  { id: 'bottoms', name: 'Calças', icon: '👖' },
  { id: 'dresses', name: 'Vestidos', icon: '👗' },
  { id: 'outerwear', name: 'Casacos', icon: '🧥' },
  { id: 'shoes', name: 'Sapatos', icon: '👠' },
  { id: 'accessories', name: 'Acessórios', icon: '👜' }
];

const Closet: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('closet');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [items, setItems] = useState(mockClosetItems);

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const toggleFavorite = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const stats = {
    total: items.length,
    favorites: items.filter(i => i.favorite).length,
    categories: new Set(items.map(i => i.category)).size
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom pb-20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-neutral-900">Meu Closet</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-neutral-100 rounded-lg"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            <button className="p-2 bg-neutral-100 rounded-lg">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-primary/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
            <p className="text-xs text-neutral-600">Peças</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-red-500">{stats.favorites}</p>
            <p className="text-xs text-neutral-600">Favoritas</p>
          </div>
          <div className="bg-secondary/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-secondary">{stats.categories}</p>
            <p className="text-xs text-neutral-600">Categorias</p>
          </div>
        </div>
      </motion.header>

      {/* Categories */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-neutral-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="px-4 mt-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all ${
                      item.favorite
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-neutral-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.favorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-neutral-900 text-sm">{item.name}</h3>
                  <p className="text-xs text-neutral-600">{item.brand} • {item.size}</p>
                  <div className="flex gap-1 mt-2">
                    {item.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-3 flex gap-3 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-900">{item.name}</h3>
                  <p className="text-sm text-neutral-600">{item.brand} • {item.size} • {item.color}</p>
                  <div className="flex gap-1 mt-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-2 rounded-lg transition-all ${
                      item.favorite
                        ? 'bg-red-50 text-red-500'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.favorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 bg-neutral-100 rounded-lg text-neutral-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* FAB - Add Item */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/closet/add')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 safe-bottom"
      >
        <div className="grid grid-cols-5 gap-1 p-2">
          {[
            { id: 'home', icon: Home, label: 'Início' },
            { id: 'search', icon: Search, label: 'Buscar' },
            { id: 'scan', icon: Camera, label: 'Scan' },
            { id: 'closet', icon: Shirt, label: 'Closet' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'home') navigate('/home');
                else if (tab.id === 'scan') navigate('/analyze');
                else if (tab.id === 'search') navigate('/search');
                else if (tab.id === 'profile') navigate('/profile');
                else setActiveTab(tab.id);
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

export default Closet;