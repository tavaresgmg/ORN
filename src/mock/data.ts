import { BodyType, ColorPalette, ClothingItem, Recommendation } from '../types';

export const mockBodyTypes: Record<string, BodyType> = {
  curvy: {
    id: 'curvy',
    name: 'Curvilínea',
    description: 'Silhueta com curvas naturais e cintura definida',
    silhouette: 'curvy',
    recommendations: [
      'Roupas que marquem a cintura',
      'Tecidos com caimento estruturado',
      'Decotes em V ou coração',
      'Calças de cintura alta'
    ],
    strengths: ['Cintura definida', 'Proporções equilibradas', 'Curvas femininas']
  },
  straight: {
    id: 'straight',
    name: 'Retangular',
    description: 'Silhueta com linhas retas e proporções uniformes',
    silhouette: 'straight',
    recommendations: [
      'Criar curvas com volume e texturas',
      'Cintos e acessórios na cintura',
      'Camadas e sobreposições',
      'Estampas horizontais'
    ],
    strengths: ['Versatilidade de estilos', 'Facilidade com peças oversized', 'Look andrógino chic']
  },
  pear: {
    id: 'pear',
    name: 'Triângulo',
    description: 'Quadril mais largo que os ombros',
    silhouette: 'pear',
    recommendations: [
      'Valorizar a parte superior',
      'Detalhes nos ombros',
      'Cores claras em cima',
      'Calças retas ou bootcut'
    ],
    strengths: ['Cintura definida', 'Quadril feminino', 'Versatilidade em vestidos']
  }
};

export const mockColorPalettes: Record<string, ColorPalette> = {
  warm: {
    id: 'warm',
    name: 'Quente',
    season: 'autumn',
    skinTone: 'warm',
    bestColors: [
      { name: 'Terracota', hex: '#C65D00', category: 'primary' },
      { name: 'Dourado', hex: '#FFD700', category: 'accent' },
      { name: 'Coral', hex: '#FF7F50', category: 'primary' },
      { name: 'Verde Oliva', hex: '#708238', category: 'secondary' },
      { name: 'Caramelo', hex: '#C68E17', category: 'neutral' }
    ],
    avoidColors: [
      { name: 'Azul Gelo', hex: '#B0E0E6', category: 'primary' },
      { name: 'Rosa Fúcsia', hex: '#FF1493', category: 'accent' },
      { name: 'Cinza Frio', hex: '#708090', category: 'neutral' }
    ]
  },
  cool: {
    id: 'cool',
    name: 'Fria',
    season: 'winter',
    skinTone: 'cool',
    bestColors: [
      { name: 'Azul Royal', hex: '#4169E1', category: 'primary' },
      { name: 'Rosa Pink', hex: '#FFC0CB', category: 'accent' },
      { name: 'Roxo', hex: '#800080', category: 'primary' },
      { name: 'Verde Esmeralda', hex: '#50C878', category: 'secondary' },
      { name: 'Preto', hex: '#000000', category: 'neutral' }
    ],
    avoidColors: [
      { name: 'Laranja', hex: '#FFA500', category: 'primary' },
      { name: 'Amarelo Mostarda', hex: '#FFDB58', category: 'accent' },
      { name: 'Marrom', hex: '#964B00', category: 'neutral' }
    ]
  }
};

export const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Blazer Estruturado',
    brand: 'Zara',
    category: 'outerwear',
    price: 299.90,
    store: 'Zara',
    images: ['https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#000000', category: 'neutral' },
      { name: 'Caramelo', hex: '#C68E17', category: 'neutral' }
    ],
    rating: 4.8,
    tags: ['trabalho', 'formal', 'versátil'],
    occasionType: ['work', 'formal']
  },
  {
    id: '2',
    name: 'Vestido Midi Floral',
    brand: 'Renner',
    category: 'dresses',
    price: 159.90,
    store: 'Renner',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Estampado', hex: '#FFB6C1', category: 'primary' }
    ],
    rating: 4.5,
    tags: ['romântico', 'feminino', 'verão'],
    occasionType: ['date', 'casual']
  },
  {
    id: '3',
    name: 'Calça Wide Leg',
    brand: 'C&A',
    category: 'bottoms',
    price: 129.90,
    store: 'C&A',
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'],
    sizes: ['36', '38', '40', '42', '44'],
    colors: [
      { name: 'Bege', hex: '#F5DEB3', category: 'neutral' },
      { name: 'Preto', hex: '#000000', category: 'neutral' }
    ],
    rating: 4.3,
    tags: ['confortável', 'tendência', 'alongador'],
    occasionType: ['casual', 'work']
  },
  {
    id: '4',
    name: 'Blusa Decote V',
    brand: 'Riachuelo',
    category: 'tops',
    price: 79.90,
    store: 'Riachuelo',
    images: ['https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400'],
    sizes: ['P', 'M', 'G'],
    colors: [
      { name: 'Coral', hex: '#FF7F50', category: 'primary' },
      { name: 'Branco', hex: '#FFFFFF', category: 'neutral' }
    ],
    rating: 4.6,
    tags: ['básico', 'essencial', 'versátil'],
    occasionType: ['casual', 'work']
  },
  {
    id: '5',
    name: 'Saia Plissada Midi',
    brand: 'Amaro',
    category: 'bottoms',
    price: 189.90,
    store: 'Amaro',
    images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Verde Oliva', hex: '#708238', category: 'secondary' }
    ],
    rating: 4.7,
    tags: ['elegante', 'movimento', 'midi'],
    occasionType: ['work', 'formal', 'date']
  }
];

export const generateRecommendations = (
  bodyType: string,
  skinTone: string
): Recommendation[] => {
  const items = mockClothingItems.filter(item => {
    // Lógica simplificada de recomendação
    if (bodyType === 'curvy') {
      return item.tags.includes('cintura') || 
             item.category === 'dresses' || 
             item.name.includes('Decote V');
    }
    if (skinTone === 'warm') {
      return item.colors.some(c => 
        ['Coral', 'Caramelo', 'Verde Oliva', 'Bege'].includes(c.name)
      );
    }
    return true;
  });

  return items.slice(0, 3).map((item, index) => ({
    id: `rec-${index}`,
    item,
    score: 9.5 - index * 0.3,
    reasons: [
      'Valoriza sua silhueta',
      'Cor perfeita para seu tom de pele',
      'Ideal para seu estilo de vida'
    ].slice(0, 2 + Math.floor(Math.random() * 2)),
    matchDetails: {
      bodyTypeMatch: 90 + Math.random() * 10,
      colorMatch: 85 + Math.random() * 15,
      styleMatch: 88 + Math.random() * 12
    },
    createdAt: new Date()
  }));
};

export const mockUserProfile = {
  height: 165,
  weight: 62,
  age: 32,
  measurements: {
    bust: 90,
    waist: 72,
    hip: 98
  },
  bodyType: mockBodyTypes.curvy,
  colorPalette: mockColorPalettes.warm
};