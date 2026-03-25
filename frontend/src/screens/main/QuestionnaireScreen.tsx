import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const SKIN_TYPES = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'];
const SKIN_CONCERNS = ['Acne', 'Wrinkles', 'Dark Spots', 'Redness', 'Dryness', 'Sensitivity', 'Oiliness'];
const ALLERGIES = ['Fragrance', 'Alcohol', 'Sulfates', 'Parabens', 'Gluten', 'Nut oils'];

export default function QuestionnaireScreen() {
  const { user, updateUserProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [skinType, setSkinType] = useState(user?.skinType || '');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(user?.skinConcerns || []);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(user?.allergies || []);
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const toggleAllergy = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter(a => a !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !skinType) {
      Alert.alert('Required', 'Please select a skin type');
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        skinType,
        skinConcerns: selectedConcerns,
        allergies: selectedAllergies,
        completedQuestionnaire: true,
      });
      Alert.alert('Success', 'Profile updated successfully');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.stepText}>Step {currentStep} of 4</Text>
        </View>

        {/* Step 1: Skin Type */}
        {currentStep === 1 && (
          <View>
            <Text style={styles.stepTitle}>What's Your Skin Type?</Text>
            <Text style={styles.stepDescription}>
              This helps us give you the best recommendations
            </Text>

            <View style={styles.optionsContainer}>
              {SKIN_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.optionButton,
                    skinType === type && styles.optionButtonActive,
                  ]}
                  onPress={() => setSkinType(type)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      skinType === type && styles.optionTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                  {skinType === type && <Check size={20} color="#FFFFFF" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 2: Skin Concerns */}
        {currentStep === 2 && (
          <View>
            <Text style={styles.stepTitle}>Select Your Skin Concerns</Text>
            <Text style={styles.stepDescription}>
              Choose all that apply (at least one required)
            </Text>

            <View style={styles.optionsContainer}>
              {SKIN_CONCERNS.map(concern => (
                <TouchableOpacity
                  key={concern}
                  style={[
                    styles.optionButton,
                    selectedConcerns.includes(concern) && styles.optionButtonActive,
                  ]}
                  onPress={() => toggleConcern(concern)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedConcerns.includes(concern) && styles.optionTextActive,
                    ]}
                  >
                    {concern}
                  </Text>
                  {selectedConcerns.includes(concern) && <Check size={20} color="#FFFFFF" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 3: Allergies */}
        {currentStep === 3 && (
          <View>
            <Text style={styles.stepTitle}>Any Known Allergies?</Text>
            <Text style={styles.stepDescription}>
              Select any ingredients you're allergic to
            </Text>

            <View style={styles.optionsContainer}>
              {ALLERGIES.map(allergy => (
                <TouchableOpacity
                  key={allergy}
                  style={[
                    styles.optionButton,
                    selectedAllergies.includes(allergy) && styles.optionButtonActive,
                  ]}
                  onPress={() => toggleAllergy(allergy)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedAllergies.includes(allergy) && styles.optionTextActive,
                    ]}
                  >
                    {allergy}
                  </Text>
                  {selectedAllergies.includes(allergy) && <Check size={20} color="#FFFFFF" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <View>
            <Text style={styles.stepTitle}>Review Your Profile</Text>

            <Card variant="primary">
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Skin Type</Text>
                <Text style={styles.reviewValue}>{skinType}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Skin Concerns</Text>
                <View style={styles.tagsContainer}>
                  {selectedConcerns.map(concern => (
                    <View key={concern} style={styles.tag}>
                      <Text style={styles.tagText}>{concern}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Allergies</Text>
                {selectedAllergies.length > 0 ? (
                  <View style={styles.tagsContainer}>
                    {selectedAllergies.map(allergy => (
                      <View key={allergy} style={styles.allergyTag}>
                        <Text style={styles.allergyTagText}>{allergy}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noAllergies}>None selected</Text>
                )}
              </View>
            </Card>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {currentStep > 1 && (
            <Button
              title="Back"
              variant="outline"
              onPress={() => setCurrentStep(currentStep - 1)}
              size="lg"
              style={styles.button}
            />
          )}
          <Button
            title={currentStep === 4 ? 'Complete' : 'Next'}
            onPress={currentStep === 4 ? handleSubmit : handleNext}
            loading={loading}
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
    paddingVertical: 24,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6B5FD9',
  },
  stepText: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    marginBottom: 32,
  },
  optionsContainer: {
    marginBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    minWidth: '45%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  optionButtonActive: {
    backgroundColor: '#6B5FD9',
    borderColor: '#6B5FD9',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#333333',
  },
  optionTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Geist-Bold',
  },
  reviewItem: {
    marginVertical: 12,
  },
  reviewLabel: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#999999',
    marginBottom: 4,
  },
  reviewValue: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
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
  noAllergies: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#999999',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5D9FF',
    marginVertical: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  button: {
    flex: 1,
  },
});
