import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Upload, X, Sparkles, Check, AlertCircle, ShoppingBag, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AnalysisResult {
  score: number;
  recommendation: 'perfect' | 'good' | 'avoid';
  reasons: {
    positive: string[];
    negative: string[];
  };
  colorMatch: boolean;
  styleMatch: boolean;
  stores: Array<{
    name: string;
    price: number;
    availability: boolean;
  }>;
}

const Analyze: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setAnalyzing(true);
    // Simular análise de IA
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Resultado mockado
    const mockResult: AnalysisResult = {
      score: Math.random() > 0.5 ? 8.7 : 3.2,
      recommendation: Math.random() > 0.5 ? 'perfect' : 'avoid',
      reasons: {
        positive: [
          'Valoriza sua cintura definida',
          'Cor perfeita para seu tom de pele quente',
          'Comprimento ideal para sua altura'
        ],
        negative: Math.random() > 0.5 ? [] : [
          'Modelagem pode não favorecer suas curvas',
          'Tecido pode marcar em áreas indesejadas'
        ]
      },
      colorMatch: true,
      styleMatch: Math.random() > 0.5,
      stores: [
        { name: 'Zara', price: 199.90, availability: true },
        { name: 'Renner', price: 159.90, availability: true },
        { name: 'C&A', price: 139.90, availability: false }
      ]
    };

    setResult(mockResult);
    setAnalyzing(false);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-neutral-50 safe-top safe-bottom pb-24">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-6 h-6 text-neutral-700" />
          </button>
          <h1 className="text-lg font-semibold text-neutral-900">Resultado da Análise</h1>
          <button onClick={resetAnalysis} className="p-2">
            <X className="w-6 h-6 text-neutral-700" />
          </button>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4"
        >
          {/* Imagem analisada */}
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <img
              src={selectedImage!}
              alt="Peça analisada"
              className="w-full h-64 object-cover"
            />
            <div className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold text-white flex items-center gap-2 ${
              result.recommendation === 'perfect' ? 'bg-green-500' : 
              result.recommendation === 'good' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {result.recommendation === 'perfect' ? <Check className="w-5 h-5" /> :
               result.recommendation === 'good' ? <Sparkles className="w-5 h-5" /> :
               <AlertCircle className="w-5 h-5" />}
              {result.score}/10
            </div>
          </div>

          {/* Veredito */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`rounded-2xl p-6 mb-6 ${
              result.recommendation === 'perfect' ? 'bg-green-50 border-2 border-green-200' :
              result.recommendation === 'good' ? 'bg-yellow-50 border-2 border-yellow-200' :
              'bg-red-50 border-2 border-red-200'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-2 ${
              result.recommendation === 'perfect' ? 'text-green-800' :
              result.recommendation === 'good' ? 'text-yellow-800' :
              'text-red-800'
            }`}>
              {result.recommendation === 'perfect' ? 'PERFEITA para você!' :
               result.recommendation === 'good' ? 'BOA opção' :
               'NÃO recomendamos'}
            </h2>
            <p className={`${
              result.recommendation === 'perfect' ? 'text-green-700' :
              result.recommendation === 'good' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {result.recommendation === 'perfect' ? 'Esta peça foi feita para valorizar seu corpo!' :
               result.recommendation === 'good' ? 'Pode funcionar bem com alguns ajustes' :
               'Existem opções melhores para seu perfil'}
            </p>
          </motion.div>

          {/* Análise detalhada */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 mb-6"
          >
            {result.reasons.positive.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Pontos positivos
                </h3>
                <ul className="space-y-2">
                  {result.reasons.positive.map((reason, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.reasons.negative.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Pontos de atenção
                </h3>
                <ul className="space-y-2">
                  {result.reasons.negative.map((reason, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Match details */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-xl p-4 text-center ${
                result.colorMatch ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className={`text-2xl mb-1 ${
                  result.colorMatch ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.colorMatch ? '🎨' : '❌'}
                </div>
                <p className="text-sm font-medium text-neutral-700">Cor</p>
                <p className={`text-xs ${
                  result.colorMatch ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.colorMatch ? 'Combina' : 'Não combina'}
                </p>
              </div>
              <div className={`rounded-xl p-4 text-center ${
                result.styleMatch ? 'bg-green-50' : 'bg-yellow-50'
              }`}>
                <div className={`text-2xl mb-1 ${
                  result.styleMatch ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {result.styleMatch ? '✨' : '🤔'}
                </div>
                <p className="text-sm font-medium text-neutral-700">Estilo</p>
                <p className={`text-xs ${
                  result.styleMatch ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {result.styleMatch ? 'Seu estilo' : 'Diferente'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Onde comprar */}
          {result.recommendation !== 'avoid' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="card mb-6"
            >
              <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Onde encontrar
              </h3>
              <div className="space-y-2">
                {result.stores.map((store, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-medium text-neutral-900">{store.name}</p>
                      <p className="text-sm text-neutral-600">
                        {store.availability ? 'Disponível' : 'Indisponível'}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      R$ {store.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Salvar
            </button>
            <button 
              onClick={resetAnalysis}
              className="btn-primary flex-1"
            >
              Analisar outra
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-neutral-700" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-900">Analisar Peça</h1>
        <div className="w-10" />
      </header>

      <div className="p-6">
        {!selectedImage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Vamos analisar!
              </h2>
              <p className="text-neutral-600 max-w-xs mx-auto">
                Tire uma foto da peça que você quer saber se combina com você
              </p>
            </div>

            <div className="space-y-3">
              <label className="btn-primary w-full cursor-pointer flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" />
                Tirar foto
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageCapture}
                />
              </label>

              <label className="btn-secondary w-full cursor-pointer flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Escolher da galeria
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageCapture}
                />
              </label>
            </div>

            <div className="bg-primary/10 rounded-xl p-4">
              <h3 className="font-medium text-primary mb-2">💡 Dicas para melhor análise:</h3>
              <ul className="space-y-1 text-sm text-neutral-700">
                <li>• Boa iluminação (preferencialmente natural)</li>
                <li>• Peça esticada ou em cabide</li>
                <li>• Foto de frente, mostrando toda a peça</li>
                <li>• Evite filtros ou edições</li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {!analyzing ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Peça selecionada"
                    className="w-full h-96 object-cover"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                  >
                    <X className="w-5 h-5 text-neutral-700" />
                  </button>
                </div>

                <button
                  onClick={analyzeImage}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Analisar com IA
                </button>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="btn-secondary w-full"
                >
                  Escolher outra foto
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-[400px]"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full mb-6"
                />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Analisando com IA...
                </h3>
                <div className="space-y-2 text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-neutral-600"
                  >
                    📊 Verificando tipo de peça...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-sm text-neutral-600"
                  >
                    🎨 Analisando cores e padrões...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-sm text-neutral-600"
                  >
                    ✨ Comparando com seu perfil...
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Analyze;