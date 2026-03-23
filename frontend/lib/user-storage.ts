import { UserProfile } from './auth-context';

export interface AnalysisHistory {
  id: string;
  date: Date;
  imageUrl: string;
  skinType: string;
  conditions: string[];
  healthScore: number;
  severity: string;
  ingredients: string[];
  confidence: number;
}

export interface UserData {
  profile: UserProfile;
  analysisHistory: AnalysisHistory[];
  currentRoutine?: {
    morning: string[];
    night: string[];
    weekly: string[];
  };
}

export function saveAnalysisToHistory(userId: string, analysis: Omit<AnalysisHistory, 'id' | 'date'>) {
  const userData = getUserData(userId);
  const newAnalysis: AnalysisHistory = {
    ...analysis,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date(),
  };

  userData.analysisHistory.push(newAnalysis);
  localStorage.setItem(`dermaai_user_data_${userId}`, JSON.stringify(userData));
  return newAnalysis;
}

export function getUserData(userId: string): UserData {
  const stored = localStorage.getItem(`dermaai_user_data_${userId}`);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      // Convert date strings back to Date objects
      data.analysisHistory = data.analysisHistory.map((a: any) => ({
        ...a,
        date: new Date(a.date),
      }));
      return data;
    } catch (error) {
      console.error('Failed to parse user data:', error);
    }
  }

  return {
    profile: {} as UserProfile,
    analysisHistory: [],
  };
}

export function saveUserData(userId: string, data: UserData) {
  localStorage.setItem(`dermaai_user_data_${userId}`, JSON.stringify(data));
}

export function getAnalysisHistory(userId: string): AnalysisHistory[] {
  const userData = getUserData(userId);
  return userData.analysisHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function clearAnalysisHistory(userId: string) {
  const userData = getUserData(userId);
  userData.analysisHistory = [];
  saveUserData(userId, userData);
}
