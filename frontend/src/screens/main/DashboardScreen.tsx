import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { LogOut, Edit2, TrendingUp } from 'lucide-react-native';

export default function DashboardScreen({ navigation }: any) {
  const { user, signOut } = useAuth();
  const { analysisHistory } = useApp();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Sign Out',
        onPress: async () => {
          await signOut();
        },
        style: 'destructive',
      },
    ]);
  };

  const latestAnalysis = analysisHistory[0];
  const avgHealthScore = analysisHistory.length > 0
    ? Math.round(analysisHistory.reduce((sum, a) => sum + a.healthScore, 0) / analysisHistory.length)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Header */}
        <View style={styles.headerContainer}>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Analyses</Text>
            <Text style={styles.statValue}>{analysisHistory.length}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Avg Score</Text>
            <Text style={styles.statValue}>{avgHealthScore}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Skin Type</Text>
            <Text style={styles.statValue}>{user?.skinType?.slice(0, 3)}</Text>
          </Card>
        </View>

        {/* Profile Information */}
        <Card variant="primary">
          <Text style={styles.sectionTitle}>Profile Information</Text>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Full Name</Text>
            <Text style={styles.profileValue}>{user?.name}</Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Email Address</Text>
            <Text style={styles.profileValue}>{user?.email}</Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Skin Type</Text>
            <Text style={styles.profileValue}>{user?.skinType}</Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Main Concerns</Text>
            <View style={styles.tagsContainer}>
              {user?.skinConcerns?.map(concern => (
                <View key={concern} style={styles.tag}>
                  <Text style={styles.tagText}>{concern}</Text>
                </View>
              ))}
            </View>
          </View>

          {user?.allergies && user.allergies.length > 0 && (
            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Allergies</Text>
              <View style={styles.tagsContainer}>
                {user.allergies.map(allergy => (
                  <View key={allergy} style={styles.allergyTag}>
                    <Text style={styles.allergyTagText}>{allergy}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card>

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>Recent Analyses</Text>

            {latestAnalysis && (
              <View style={styles.analysisItem}>
                <View>
                  <Text style={styles.analysisDate}>
                    {new Date(latestAnalysis.date).toLocaleDateString()}
                  </Text>
                  <View style={styles.conditionsContainer}>
                    {latestAnalysis.conditions.map(condition => (
                      <View key={condition} style={styles.conditionTag}>
                        <Text style={styles.conditionTagText}>{condition}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.scoreContainer}>
                  <TrendingUp size={20} color="#4CAF50" />
                  <Text style={styles.scoreValue}>{latestAnalysis.healthScore}</Text>
                </View>
              </View>
            )}

            {analysisHistory.length > 1 && (
              <Text style={styles.moreAnalyses}>
                + {analysisHistory.length - 1} more analyses
              </Text>
            )}
          </Card>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Button
            title="Edit Profile"
            variant="secondary"
            onPress={() => navigation.navigate('Questionnaire')}
            size="lg"
            icon={<Edit2 size={20} color="#FFFFFF" />}
            style={styles.actionButton}
          />
          <Button
            title="Sign Out"
            variant="outline"
            onPress={handleSignOut}
            size="lg"
            icon={<LogOut size={20} color="#333333" />}
            style={styles.actionButton}
          />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>DermaAI v1.0.0</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 16,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6B5FD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontFamily: 'Geist-Bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Geist-Bold',
    color: '#6B5FD9',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 16,
  },
  profileItem: {
    marginBottom: 16,
  },
  profileLabel: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#333333',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E5D9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#6B5FD9',
  },
  allergyTag: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  allergyTagText: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#FF6B6B',
  },
  analysisItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  analysisDate: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  conditionTag: {
    backgroundColor: '#FFE5CC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conditionTagText: {
    fontSize: 11,
    fontFamily: 'Geist',
    color: '#FF9500',
  },
  scoreContainer: {
    alignItems: 'center',
    gap: 4,
  },
  scoreValue: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#4CAF50',
  },
  moreAnalyses: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
    marginTop: 8,
  },
  actionButtonsContainer: {
    marginTop: 32,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
    textAlign: 'center',
    marginTop: 20,
  },
});
