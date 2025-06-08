import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, Users, Sparkles, ChevronRight, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface KibbeType {
  id: string;
  name: string;
  shortName: string;
  description: string;
  characteristics: string[];
  bestClothing: string[];
  avoid: string[];
  icon: string;
  color: string;
}

const kibbeTypes: KibbeType[] = [
  {
    id: 'dramatic',
    name: 'Dramático',
    shortName: 'D',
    description: 'Linhas angulares e marcantes, estrutura óssea proeminente',
    characteristics: [
      'Altura acima da média (geralmente)',
      'Estrutura óssea angular e afiada',
      'Ombros largos e definidos',
      'Traços faciais marcantes'
    ],
    bestClothing: [
      'Linhas retas e geométricas',
      'Tecidos estruturados',
      'Peças monocromáticas',
      'Cortes minimalistas'
    ],
    avoid: [
      'Babados e folhos',
      'Estampas pequenas e delicadas',
      'Tecidos muito fluidos'
    ],
    icon: '🔷',
    color: 'bg-gray-800'
  },
  {
    id: 'soft-dramatic',
    name: 'Dramático Suave',
    shortName: 'SD',
    description: 'Estrutura dramática com suavidade nas curvas',
    characteristics: [
      'Altura média a alta',
      'Estrutura óssea angular com curvas',
      'Presença marcante',
      'Combinação de linhas retas e curvas'
    ],
    bestClothing: [
      'Linhas longas e fluidas',
      'Tecidos luxuosos',
      'Decotes profundos',
      'Silhuetas ajustadas'
    ],
    avoid: [
      'Peças muito rígidas',
      'Detalhes infantis',
      'Cortes muito retos'
    ],
    icon: '💎',
    color: 'bg-purple-800'
  },
  {
    id: 'natural',
    name: 'Natural',
    shortName: 'N',
    description: 'Linhas relaxadas e não estruturadas, aparência casual',
    characteristics: [
      'Estrutura óssea larga e reta',
      'Aparência atlética',
      'Ombros largos',
      'Quadril reto'
    ],
    bestClothing: [
      'Peças casuais e confortáveis',
      'Tecidos naturais',
      'Cortes relaxados',
      'Camadas sobrepostas'
    ],
    avoid: [
      'Peças muito ajustadas',
      'Detalhes muito delicados',
      'Looks muito formais'
    ],
    icon: '🌿',
    color: 'bg-green-700'
  },
  {
    id: 'soft-natural',
    name: 'Natural Suave',
    shortName: 'SN',
    description: 'Estrutura natural com suavidade e curvas sutis',
    characteristics: [
      'Altura média',
      'Estrutura óssea moderada com curvas',
      'Aparência amigável',
      'Ombros arredondados'
    ],
    bestClothing: [
      'Tecidos macios e fluidos',
      'Cortes relaxados com cintura',
      'Estampas médias',
      'Looks descontraídos'
    ],
    avoid: [
      'Peças muito estruturadas',
      'Linhas muito retas',
      'Tecidos muito rígidos'
    ],
    icon: '🌸',
    color: 'bg-pink-600'
  },
  {
    id: 'classic',
    name: 'Clássico',
    shortName: 'C',
    description: 'Equilíbrio perfeito e simetria, moderação em tudo',
    characteristics: [
      'Altura média',
      'Proporções equilibradas',
      'Nem muito angular nem muito curvilínea',
      'Aparência refinada'
    ],
    bestClothing: [
      'Peças atemporais',
      'Cortes tradicionais',
      'Linhas limpas',
      'Tecidos de qualidade'
    ],
    avoid: [
      'Extremos de qualquer tipo',
      'Peças muito dramáticas',
      'Estilos muito casuais'
    ],
    icon: '⚖️',
    color: 'bg-blue-700'
  },
  {
    id: 'soft-classic',
    name: 'Clássico Suave',
    shortName: 'SC',
    description: 'Equilíbrio clássico com toques de suavidade',
    characteristics: [
      'Altura média',
      'Estrutura equilibrada com curvas suaves',
      'Aparência feminina e elegante',
      'Traços delicados'
    ],
    bestClothing: [
      'Tecidos fluidos e macios',
      'Detalhes femininos sutis',
      'Cores suaves',
      'Peças românticas discretas'
    ],
    avoid: [
      'Linhas muito duras',
      'Peças muito masculinas',
      'Estilos muito dramáticos'
    ],
    icon: '🌹',
    color: 'bg-rose-600'
  },
  {
    id: 'gamine',
    name: 'Gamine',
    shortName: 'G',
    description: 'Combinação de linhas retas e curvas em escala pequena',
    characteristics: [
      'Altura baixa a média',
      'Estrutura óssea delicada e angular',
      'Aparência jovial',
      'Mistura de Yin e Yang'
    ],
    bestClothing: [
      'Peças com contraste',
      'Mix de texturas',
      'Cortes geométricos pequenos',
      'Estilo boyish chic'
    ],
    avoid: [
      'Peças muito longas',
      'Tecidos muito pesados',
      'Looks muito sérios'
    ],
    icon: '⭐',
    color: 'bg-yellow-600'
  },
  {
    id: 'soft-gamine',
    name: 'Gamine Suave',
    shortName: 'SG',
    description: 'Estrutura gamine com mais curvas e suavidade',
    characteristics: [
      'Altura baixa',
      'Estrutura pequena com curvas',
      'Rosto arredondado',
      'Aparência doce e jovial'
    ],
    bestClothing: [
      'Peças curtas e ajustadas',
      'Detalhes divertidos',
      'Cores vibrantes',
      'Estampas pequenas'
    ],
    avoid: [
      'Peças oversized',
      'Linhas muito longas',
      'Estilos muito maduros'
    ],
    icon: '✨',
    color: 'bg-indigo-600'
  },
  {
    id: 'romantic',
    name: 'Romântico',
    shortName: 'R',
    description: 'Máxima feminilidade, curvas arredondadas e delicadeza',
    characteristics: [
      'Altura baixa a média',
      'Estrutura óssea delicada',
      'Curvas arredondadas proeminentes',
      'Aparência extremamente feminina'
    ],
    bestClothing: [
      'Tecidos fluidos e delicados',
      'Detalhes românticos',
      'Decotes suaves',
      'Silhuetas que abraçam as curvas'
    ],
    avoid: [
      'Linhas retas e duras',
      'Peças muito estruturadas',
      'Estilos masculinos'
    ],
    icon: '💕',
    color: 'bg-pink-700'
  },
  {
    id: 'theatrical-romantic',
    name: 'Romântico Teatral',
    shortName: 'TR',
    description: 'Delicadeza romântica com toques de drama',
    characteristics: [
      'Altura baixa',
      'Estrutura pequena e delicada com curvas',
      'Cintura definida',
      'Mistura de delicadeza e sensualidade'
    ],
    bestClothing: [
      'Tecidos luxuosos',
      'Detalhes ornamentados',
      'Cortes que valorizam curvas',
      'Estampas elaboradas'
    ],
    avoid: [
      'Peças muito simples',
      'Linhas muito retas',
      'Estilos muito casuais'
    ],
    icon: '🌺',
    color: 'bg-red-700'
  }
];

const KibbeGuide: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<KibbeType | null>(null);

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-secondary" />
        </button>
        <h1 className="text-lg font-semibold text-secondary">Método Kibbe</h1>
        <button className="p-2">
          <Info className="w-6 h-6 text-secondary" />
        </button>
      </header>

      {!selectedType ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4"
        >
          {/* Introduction */}
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-bold text-secondary">O que é o Sistema Kibbe?</h2>
            </div>
            <p className="text-secondary/80 mb-4">
              O sistema Kibbe foi criado por David Kibbe nos anos 80 e classifica os tipos de corpo 
              feminino em 10 categorias baseadas no equilíbrio entre características Yin (suaves, 
              arredondadas) e Yang (angulares, marcantes).
            </p>
            <div className="bg-primary/10 rounded-xl p-4">
              <p className="text-sm text-secondary font-medium mb-2">💡 Por que usar o Kibbe?</p>
              <ul className="space-y-1 text-sm text-secondary/80">
                <li>• Descubra peças que realçam sua beleza natural</li>
                <li>• Entenda porque algumas roupas ficam perfeitas em você</li>
                <li>• Crie um guarda-roupa mais assertivo</li>
                <li>• Economize tempo e dinheiro em compras</li>
              </ul>
            </div>
          </div>

          {/* Types Grid */}
          <h3 className="text-lg font-bold text-secondary mb-4">Tipos Kibbe</h3>
          <div className="grid grid-cols-2 gap-3">
            {kibbeTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType(type)}
                className="bg-white rounded-xl p-4 text-left hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center text-2xl mb-3`}>
                  {type.icon}
                </div>
                <h4 className="font-semibold text-secondary mb-1">{type.name}</h4>
                <p className="text-xs text-secondary/70">{type.shortName}</p>
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">Descubra seu tipo!</h3>
                <p className="text-sm opacity-90">Faça o teste completo</p>
              </div>
              <Sparkles className="w-8 h-8 opacity-80" />
            </div>
            <button 
              onClick={() => navigate('/kibbe-test')}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors w-full"
            >
              Começar teste
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4"
        >
          {/* Type Detail */}
          <button
            onClick={() => setSelectedType(null)}
            className="flex items-center gap-2 text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Voltar aos tipos</span>
          </button>

          <div className="bg-white rounded-2xl p-6 mb-4">
            <div className={`w-16 h-16 rounded-xl ${selectedType.color} flex items-center justify-center text-3xl mb-4`}>
              {selectedType.icon}
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">{selectedType.name}</h2>
            <p className="text-secondary/80 mb-4">{selectedType.description}</p>

            {/* Characteristics */}
            <div className="mb-6">
              <h3 className="font-semibold text-secondary mb-3">Características</h3>
              <ul className="space-y-2">
                {selectedType.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-secondary/80">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Clothing */}
            <div className="mb-6">
              <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                O que valoriza
              </h3>
              <ul className="space-y-2">
                {selectedType.bestClothing.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-secondary/80">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid */}
            <div className="mb-6">
              <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                O que evitar
              </h3>
              <ul className="space-y-2">
                {selectedType.avoid.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-secondary/80">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button 
              onClick={() => navigate(`/search?kibbe=${selectedType.id}`)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Ver peças para {selectedType.shortName}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default KibbeGuide;