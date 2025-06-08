import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X, Filter, TrendingUp, Clock, Tag, Home, Camera, User, Shirt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockClothingItems } from '../mock/data';

const trendingSearches = [
  'Blazer estruturado',
  'Vestido midi',
  'Calça wide leg',
  'Blusa decote V',
  'Saia plissada',
  'Camisa oversized'
];

const recentSearches = [
  'Vestido preto',
  'Calça jeans',
  'Blusa branca',
  'Tênis casual'
];

const popularTags = [
  { name: 'Trabalho', emoji: '💼' },
  { name: 'Casual', emoji: '☕' },
  { name: 'Festa', emoji: '🎉' },
  { name: 'Romântico', emoji: '💕' },
  { name: 'Esportivo', emoji: '🏃‍♀️' },
  { name: 'Formal', emoji: '👔' }
];

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockClothingItems>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      // Simular busca
      setTimeout(() => {
        const results = mockClothingItems.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.brand.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const handleTagSearch = (tag: string) => {
    setSearchQuery(tag);
    handleSearch(tag);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom pb-20">
      {/* Search Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar peças, marcas, estilos..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            )}
          </div>
          <button className="p-3 bg-neutral-100 rounded-xl">
            <Filter className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {['Minhas cores', 'Meu estilo', 'Promoção', 'Novidades'].map(filter => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilters.includes(filter)
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Search Results */}
        {searchQuery && searchResults.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="text-sm text-neutral-600">
              {searchResults.length} resultados para "{searchQuery}"
            </p>
            <div className="grid grid-cols-2 gap-3">
              {searchResults.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                  onClick={() => navigate(`/item/${item.id}`)}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-neutral-900">{item.name}</h3>
                    <p className="text-xs text-neutral-600">{item.brand}</p>
                    <p className="text-lg font-bold text-primary mt-1">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : searchQuery && !isSearching ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-neutral-600">Nenhum resultado encontrado</p>
            <p className="text-sm text-neutral-500 mt-2">
              Tente buscar por outras palavras-chave
            </p>
          </motion.div>
        ) : !searchQuery ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-600" />
                    Buscas recentes
                  </h2>
                  <button className="text-sm text-primary">Limpar</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(search => (
                    <button
                      key={search}
                      onClick={() => handleTagSearch(search)}
                      className="px-3 py-2 bg-white rounded-lg text-sm text-neutral-700 border border-neutral-200"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Trending */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <h2 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Em alta agora
              </h2>
              <div className="space-y-2">
                {trendingSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleTagSearch(search)}
                    className="w-full text-left p-3 bg-white rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-neutral-700">{search}</span>
                    <SearchIcon className="w-4 h-4 text-neutral-400 group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Popular Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-secondary" />
                Categorias populares
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {popularTags.map(tag => (
                  <button
                    key={tag.name}
                    onClick={() => handleTagSearch(tag.name)}
                    className="bg-white p-4 rounded-xl flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl">{tag.emoji}</span>
                    <span className="font-medium text-neutral-700">{tag.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}

        {/* Loading */}
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 safe-bottom"
      >
        <div className="grid grid-cols-5 gap-1 p-2">
          {[
            { id: 'home', icon: Home, label: 'Início' },
            { id: 'search', icon: SearchIcon, label: 'Buscar' },
            { id: 'scan', icon: Camera, label: 'Scan' },
            { id: 'closet', icon: Shirt, label: 'Closet' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'home') navigate('/home');
                else if (tab.id === 'scan') navigate('/analyze');
                else if (tab.id === 'closet') navigate('/closet');
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

export default Search;