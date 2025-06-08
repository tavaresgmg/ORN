export interface User {
  id: string;
  name: string;
  email: string;
  profile?: UserProfile;
  preferences?: UserPreferences;
  createdAt: Date;
}

export interface UserProfile {
  height: number; // em cm
  age: number;
  measurements?: {
    bust?: number;
    waist?: number;
    hip?: number;
  };
  bodyType?: BodyType;
  colorPalette?: ColorPalette;
  photoAnalysis?: {
    bodyPhoto?: string;
    facePhoto?: string;
    analyzedAt?: Date;
  };
}

export interface BodyType {
  id: string;
  name: string;
  description: string;
  silhouette: 'curvy' | 'straight' | 'athletic' | 'inverted-triangle' | 'pear' | 'hourglass';
  recommendations: string[];
  strengths: string[];
}

export interface ColorPalette {
  id: string;
  name: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  skinTone: 'warm' | 'cool' | 'neutral';
  bestColors: Color[];
  avoidColors: Color[];
}

export interface Color {
  name: string;
  hex: string;
  category: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  category: ClothingCategory;
  price: number;
  store: string;
  images: string[];
  sizes: string[];
  colors: Color[];
  rating?: number;
  tags: string[];
  occasionType?: OccasionType[];
}

export type ClothingCategory = 
  | 'tops'
  | 'bottoms' 
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories';

export type OccasionType = 
  | 'work'
  | 'casual'
  | 'party'
  | 'formal'
  | 'sport'
  | 'date';

export interface Recommendation {
  id: string;
  item: ClothingItem;
  score: number;
  reasons: string[];
  matchDetails: {
    bodyTypeMatch: number;
    colorMatch: number;
    styleMatch: number;
  };
  createdAt: Date;
}

export interface UserPreferences {
  budget?: {
    min: number;
    max: number;
  };
  favoriteStores: string[];
  style: StylePreference[];
  avoidPatterns?: string[];
  goals: UserGoal[];
}

export type StylePreference = 
  | 'classic'
  | 'romantic'
  | 'dramatic'
  | 'natural'
  | 'creative'
  | 'minimalist';

export type UserGoal = 
  | 'find-flattering-clothes'
  | 'understand-what-suits-me'
  | 'stop-wrong-purchases'
  | 'discover-my-style';

export interface Analysis {
  id: string;
  userId: string;
  type: 'body' | 'color' | 'style';
  results: any;
  confidence: number;
  createdAt: Date;
}

export interface TryOnSession {
  id: string;
  userId: string;
  item: ClothingItem;
  result?: {
    image: string;
    rating: number;
    feedback: string[];
  };
  createdAt: Date;
}