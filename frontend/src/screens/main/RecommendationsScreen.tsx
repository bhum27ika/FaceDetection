import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Beaker, Pill, Leaf } from 'lucide-react-native';

const INGREDIENTS = [
  { id: 'niacinamide', name: 'Niacinamide', benefits: 'Regulates oil, strengthens barrier', level: 'Beginner-friendly' },
  { id: 'retinol', name: 'Retinol', benefits: 'Anti-aging, boosts collagen', level: 'Intermediate' },
  { id: 'hyaluronic-acid', name: 'Hyaluronic Acid', benefits: 'Deep hydration', level: 'Beginner-friendly' },
  { id: 'salicylic-acid', name: 'Salicylic Acid', benefits: 'Exfoliates, clears pores', level: 'Intermediate' },
];

const ROUTINE = [
  { time: 'Morning', steps: ['Cleanser', 'Toner', 'Moisturizer', 'SPF 30+'] },
  { time: 'Evening', steps: ['Cleanser', 'Serum', 'Moisturizer', 'Night Cream'] },
  { time: 'Weekly', steps: ['Exfoliate (2x)', 'Face Mask (1x)', 'Deep Cleanse (1x)'] },
];

const AYURVEDIC = [
  { name: 'Turmeric & Besan', duration: '15-20 mins', benefits: 'Anti-inflammatory, brightening' },
  { name: 'Neem & Tulsi', duration: '10-15 mins', benefits: 'Acne-fighting, antibacterial' },
  { name: 'Honey & Yogurt', duration: '20 mins', benefits: 'Moisturizing, healing' },
];

export default function RecommendationsScreen() {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'routine' | 'ayurveda'>('ingredients');
  const { currentAnalysis } = useApp();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Skincare Plan</Text>

        {currentAnalysis && (
          <Card variant="primary">
            <View style={styles.analysisHeader}>
              <View>
                <Text style={styles.analysisLabel}>Latest Analysis Score</Text>
                <Text style={styles.analysisScore}>{currentAnalysis.healthScore}/100</Text>
              </View>
              <View>
                <Text style={styles.analysisLabel}>Severity</Text>
                <Text style={styles.analysisSeverity}>{currentAnalysis.severity}</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Tab Buttons */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'ingredients' && styles.tabButtonActive]}
            onPress={() => setActiveTab('ingredients')}
          >
            <Beaker size={20} color={activeTab === 'ingredients' ? '#FFFFFF' : '#6B5FD9'} />
            <Text style={[styles.tabText, activeTab === 'ingredients' && styles.tabTextActive]}>
              Ingredients
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'routine' && styles.tabButtonActive]}
            onPress={() => setActiveTab('routine')}
          >
            <Pill size={20} color={activeTab === 'routine' ? '#FFFFFF' : '#6B5FD9'} />
            <Text style={[styles.tabText, activeTab === 'routine' && styles.tabTextActive]}>
              Routine
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'ayurveda' && styles.tabButtonActive]}
            onPress={() => setActiveTab('ayurveda')}
          >
            <Leaf size={20} color={activeTab === 'ayurveda' ? '#FFFFFF' : '#6B5FD9'} />
            <Text style={[styles.tabText, activeTab === 'ayurveda' && styles.tabTextActive]}>
              Ayurveda
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ingredients Tab */}
        {activeTab === 'ingredients' && (
          <View style={styles.tabContent}>
            {INGREDIENTS.map(ingredient => (
              <Card key={ingredient.id}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientLevel}>{ingredient.level}</Text>
                <Text style={styles.ingredientBenefit}>{ingredient.benefits}</Text>
              </Card>
            ))}
          </View>
        )}

        {/* Routine Tab */}
        {activeTab === 'routine' && (
          <View style={styles.tabContent}>
            {ROUTINE.map((period, idx) => (
              <Card key={idx}>
                <Text style={styles.routineTime}>{period.time}</Text>
                {period.steps.map((step, stepIdx) => (
                  <View key={stepIdx} style={styles.routineStep}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{stepIdx + 1}</Text>
                    </View>
                    <Text style={styles.stepName}>{step}</Text>
                  </View>
                ))}
              </Card>
            ))}
          </View>
        )}

        {/* Ayurveda Tab */}
        {activeTab === 'ayurveda' && (
          <View style={styles.tabContent}>
            {AYURVEDIC.map((treatment, idx) => (
              <Card key={idx}>
                <View style={styles.treatmentHeader}>
                  <View>
                    <Text style={styles.treatmentName}>{treatment.name}</Text>
                    <Text style={styles.treatmentTime}>{treatment.duration}</Text>
                  </View>
                </View>
                <Text style={styles.treatmentBenefits}>{treatment.benefits}</Text>
                <Button
                  title="Learn How"
                  variant="outline"
                  size="sm"
                  style={styles.learnButton}
                />
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 20,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  analysisLabel: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
    marginBottom: 4,
  },
  analysisScore: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#6B5FD9',
  },
  analysisSeverity: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#FF9500',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5D9FF',
    backgroundColor: '#F5F2FF',
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: '#6B5FD9',
    borderColor: '#6B5FD9',
  },
  tabText: {
    fontSize: 12,
    fontFamily: 'Geist-Bold',
    color: '#6B5FD9',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabContent: {
    marginBottom: 24,
  },
  ingredientName: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  ingredientLevel: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#6B5FD9',
    marginBottom: 8,
  },
  ingredientBenefit: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
  },
  routineTime: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 12,
  },
  routineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5D9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#6B5FD9',
  },
  stepName: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#333333',
    flex: 1,
  },
  treatmentHeader: {
    marginBottom: 12,
  },
  treatmentName: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  treatmentTime: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
  },
  treatmentBenefits: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    marginBottom: 12,
  },
  learnButton: {
    width: '100%',
  },
});
