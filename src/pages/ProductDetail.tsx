import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ShoppingBag, Star, Check, X, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockClothingItems } from '../mock/data';

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Find the product
  const product = mockClothingItems.find(item => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-secondary">Produto não encontrado</p>
      </div>
    );
  }

  const matchScore = 8.5; // Mock score for now

  const sizes = ['PP', 'P', 'M', 'G', 'GG'];
  const availableSizes = ['P', 'M', 'G']; // Mock available sizes

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between relative z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-secondary" />
        </button>
        <h1 className="text-lg font-semibold text-secondary">Detalhes</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full transition-all ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-neutral-100 text-secondary'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 bg-neutral-100 rounded-full text-secondary">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-96 object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === 0 ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
      >
        {/* Product Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-secondary">{product.name}</h2>
              <p className="text-secondary/70">{product.brand}</p>
            </div>
            <p className="text-3xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </p>
          </div>

          {/* Match Score */}
          <div className="bg-primary/10 rounded-xl p-3 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-secondary">Match ORN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{matchScore}/10</span>
              <button 
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="text-sm text-primary underline"
              >
                Ver análise
              </button>
            </div>
          </div>

          {/* Analysis Details */}
          {showAnalysis && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-xl p-4 mb-4 space-y-3"
            >
              <div>
                <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Pontos positivos
                </h4>
                <ul className="space-y-1">
                  <li className="text-sm text-secondary/80 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                    Valoriza sua cintura definida
                  </li>
                  <li className="text-sm text-secondary/80 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                    Cor perfeita para seu tom de pele quente
                  </li>
                  <li className="text-sm text-secondary/80 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                    Estampa proporcional ao seu tipo físico
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                  <X className="w-4 h-4 text-yellow-500" />
                  Pontos de atenção
                </h4>
                <ul className="space-y-1">
                  <li className="text-sm text-secondary/80 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0" />
                    Comprimento pode precisar de ajuste
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-neutral-100 text-secondary/70 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-secondary mb-2">Descrição</h3>
            <p className="text-secondary/80 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-secondary mb-3">Tamanho</h3>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map(size => {
                const isAvailable = availableSizes.includes(size);
                const isSelected = selectedSize === size;
                
                return (
                  <button
                    key={size}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    disabled={!isAvailable}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-secondary border-2 border-primary'
                        : isAvailable
                        ? 'bg-white border-2 border-neutral-200 text-secondary hover:border-primary'
                        : 'bg-neutral-100 text-secondary/30 border-2 border-neutral-100 cursor-not-allowed'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-secondary">4.5/5</p>
              <p className="text-xs text-secondary/70">234 avaliações</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-secondary">89%</p>
              <p className="text-xs text-secondary/70">Compraram novamente</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button 
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={!selectedSize}
            >
              <ShoppingBag className="w-5 h-5" />
              Comprar agora
            </button>
            <button 
              onClick={() => navigate('/analyze')}
              className="btn-secondary px-6"
            >
              Provar Virtual
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;