import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { Zap, Target, MapPin } from 'lucide-react-native';

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();

  const handleAnalyze = () => {
    if (!user?.completedQuestionnaire) {
      navigation.navigate('Questionnaire'); // ✅ correct
    } else {
      navigation.navigate('AnalyzeScreen'); // ✅ must match navigator
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello, {user?.name || 'User'} 👋
          </Text>
          <Text style={styles.subtitle}>
            Welcome to DermaAI
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          
          {/* Skin Analysis */}
          <Card style={styles.actionCard}>
            <TouchableOpacity
              style={styles.actionContent}
              onPress={handleAnalyze}
            >
              <View style={styles.iconContainer}>
                <Zap size={28} color="#6B5FD9" />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>Skin Analysis</Text>
                <Text style={styles.actionDescription}>
                  Get instant AI analysis of your skin
                </Text>
              </View>
            </TouchableOpacity>
          </Card>

          {/* Recommendations */}
          <Card style={styles.actionCard}>
            <TouchableOpacity
              style={styles.actionContent}
              onPress={() => navigation.navigate('RecommendationsScreen')}
            >
              <View style={styles.iconContainer}>
                <Target size={28} color="#30B0C0" />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>Skincare Plan</Text>
                <Text style={styles.actionDescription}>
                  Personalized product recommendations
                </Text>
              </View>
            </TouchableOpacity>
          </Card>

          {/* Dermatologists */}
          <Card style={styles.actionCard}>
            <TouchableOpacity
              style={styles.actionContent}
              onPress={() => navigation.navigate('DermatologistsScreen')}
            >
              <View style={styles.iconContainer}>
                <MapPin size={28} color="#FF9500" />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>Find Doctors</Text>
                <Text style={styles.actionDescription}>
                  Locate nearby dermatologists
                </Text>
              </View>
            </TouchableOpacity>
          </Card>

        </View>

        {/* Profile Status */}
        {user?.completedQuestionnaire ? (
          <Card variant="primary">
            <Text style={styles.statusTitle}>Your Skin Profile</Text>

            <View style={styles.profileInfo}>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Skin Type</Text>
                <Text style={styles.profileValue}>
                  {user.skinType || '-'}
                </Text>
              </View>

              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Main Concerns</Text>
                <Text style={styles.profileValue}>
                  {user.skinConcerns?.length
                    ? user.skinConcerns.slice(0, 2).join(', ')
                    : '-'}
                </Text>
              </View>
            </View>
          </Card>
        ) : (
          <Card variant="secondary">
            <Text style={styles.statusTitle}>Complete Your Profile</Text>
            <Text style={styles.statusDescription}>
              Answer a quick questionnaire so we can give you better recommendations
            </Text>

            <Button
              title="Start Questionnaire"
              onPress={() => navigation.navigate('Questionnaire')} // ✅ FIXED
              size="lg"
              style={styles.button}
            />
          </Card>
        )}

        {/* Info */}
        <View style={styles.infoContainer}>
          <Card>
            <Text style={styles.infoTitle}>How It Works</Text>
            <Text style={styles.infoBullet}>📸 Upload a photo of your skin</Text>
            <Text style={styles.infoBullet}>🤖 Get instant AI analysis</Text>
            <Text style={styles.infoBullet}>💊 Receive personalized recommendations</Text>
            <Text style={styles.infoBullet}>🏥 Find trusted dermatologists</Text>
          </Card>
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
  },
  quickActionsContainer: {
    marginBottom: 32,
  },
  actionCard: {
    marginBottom: 12,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#666666',
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 12,
  },
  statusDescription: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileItem: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#6B5FD9',
  },
  button: {
    width: '100%',
  },
  infoContainer: {
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 12,
  },
  infoBullet: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    marginBottom: 8,
    lineHeight: 20,
  },
});
