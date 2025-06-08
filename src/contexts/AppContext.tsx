import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserProfile, Recommendation } from '../types';
import { mockUserProfile, generateRecommendations } from '../mock/data';

interface AppContextType {
  user: User | null;
  userProfile: UserProfile | null;
  recommendations: Recommendation[];
  isOnboarded: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile) => void;
  completeOnboarding: () => void;
  refreshRecommendations: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const completeOnboarding = () => {
    setIsOnboarded(true);
    // Gerar recomendações mockadas baseadas no perfil
    if (userProfile?.bodyType && userProfile?.colorPalette) {
      const recs = generateRecommendations(
        userProfile.bodyType.id,
        userProfile.colorPalette.skinTone
      );
      setRecommendations(recs);
    }
  };

  const refreshRecommendations = () => {
    if (userProfile?.bodyType && userProfile?.colorPalette) {
      const recs = generateRecommendations(
        userProfile.bodyType.id,
        userProfile.colorPalette.skinTone
      );
      setRecommendations(recs);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        userProfile,
        recommendations,
        isOnboarded,
        setUser,
        setUserProfile,
        completeOnboarding,
        refreshRecommendations
      }}
    >
      {children}
    </AppContext.Provider>
  );
};