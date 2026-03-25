import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnalysisResult } from '../context/AppContext';

const ANALYSIS_KEY = 'analysis_history_';
const USER_KEY = 'user_data';

export async function saveAnalysisToHistory(userId: string, analysis: Omit<AnalysisResult, 'id' | 'date'>) {
  try {
    const key = `${ANALYSIS_KEY}${userId}`;
    const existing = await AsyncStorage.getItem(key);
    const history: AnalysisResult[] = existing ? JSON.parse(existing) : [];

    const newAnalysis: AnalysisResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...analysis,
    };

    const updated = [newAnalysis, ...history];
    await AsyncStorage.setItem(key, JSON.stringify(updated));
    return newAnalysis;
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
}

export async function getAnalysisHistory(userId: string): Promise<AnalysisResult[]> {
  try {
    const key = `${ANALYSIS_KEY}${userId}`;
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    return [];
  }
}

export async function clearAnalysisHistory(userId: string): Promise<void> {
  try {
    const key = `${ANALYSIS_KEY}${userId}`;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing analysis history:', error);
  }
}

export async function deleteAnalysis(userId: string, analysisId: string): Promise<void> {
  try {
    const key = `${ANALYSIS_KEY}${userId}`;
    const existing = await AsyncStorage.getItem(key);
    if (existing) {
      const history: AnalysisResult[] = JSON.parse(existing);
      const filtered = history.filter(a => a.id !== analysisId);
      await AsyncStorage.setItem(key, JSON.stringify(filtered));
    }
  } catch (error) {
    console.error('Error deleting analysis:', error);
  }
}

export async function getLatestAnalysis(userId: string): Promise<AnalysisResult | null> {
  try {
    const history = await getAnalysisHistory(userId);
    return history.length > 0 ? history[0] : null;
  } catch (error) {
    console.error('Error fetching latest analysis:', error);
    return null;
  }
}

export async function getAverageHealthScore(userId: string): Promise<number> {
  try {
    const history = await getAnalysisHistory(userId);
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, a) => acc + a.healthScore, 0);
    return Math.round(sum / history.length);
  } catch (error) {
    console.error('Error calculating average score:', error);
    return 0;
  }
}
