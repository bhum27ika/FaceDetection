import React, { createContext, useState, ReactNode } from 'react';

export interface AnalysisResult {
  id: string;
  date: string;
  skinType: string;
  conditions: string[];
  healthScore: number;
  severity: string;
  confidence: number;
  recommendations: string[];
  ingredients: string[];
  imageUrl?: string;
}

interface AppContextType {
  analysisHistory: AnalysisResult[];
  currentAnalysis: AnalysisResult | null;
  addAnalysis: (analysis: AnalysisResult) => void;
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  clearHistory: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);

  const addAnalysis = (analysis: AnalysisResult) => {
    setAnalysisHistory([analysis, ...analysisHistory]);
    setCurrentAnalysis(analysis);
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
    setCurrentAnalysis(null);
  };

  return (
    <AppContext.Provider
      value={{
        analysisHistory,
        currentAnalysis,
        addAnalysis,
        setCurrentAnalysis,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
