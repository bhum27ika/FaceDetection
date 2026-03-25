import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Zap, Target, MapPin } from 'lucide-react-native';

export default function OnboardingScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>DermaAI</Text>
          <Text style={styles.subtitle}>Your AI-Powered Skin Care Solution</Text>
        </View>

        <View style={styles.featuresContainer}>
          <Card variant="primary">
            <View style={styles.featureRow}>
              <Zap size={24} color="#6B5FD9" />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Smart Analysis</Text>
                <Text style={styles.featureDescription}>
                  AI-powered skin analysis from your photos
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="primary">
            <View style={styles.featureRow}>
              <Target size={24} color="#6B5FD9" />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Personalized Recommendations</Text>
                <Text style={styles.featureDescription}>
                  Tailored skincare routines and products
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="primary">
            <View style={styles.featureRow}>
              <MapPin size={24} color="#6B5FD9" />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Find Dermatologists</Text>
                <Text style={styles.featureDescription}>
                  Locate specialists near you
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('Login')}
            size="lg"
            style={styles.button}
          />
          <Button
            title="Create Account"
            variant="outline"
            onPress={() => navigation.navigate('SignUp')}
            size="lg"
            style={styles.button}
          />
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Geist-Bold',
    color: '#6B5FD9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
  },
  buttonsContainer: {
    gap: 12,
    marginTop: 'auto',
  },
  button: {
    width: '100%',
  },
});
