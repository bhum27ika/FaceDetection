import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Camera, ImagePlus } from 'lucide-react-native';

export default function AnalyzeScreen({ navigation }: any) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { addAnalysis } = useApp();
  const { user } = useAuth();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    if (!permission?.granted) {
      const perm = await requestPermission();
      if (!perm.granted) {
        Alert.alert('Permission', 'Camera permission is required');
        return;
      }
    }

    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setSelectedImage(photo?.uri || null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select a photo first');
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const conditions = ['Acne', 'Dark Spots', 'Fine Lines', 'Redness', 'Sensitivity'];
      const analysis = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        skinType: user?.skinType || 'Normal',
        conditions: conditions.slice(0, Math.floor(Math.random() * 3) + 1),
        healthScore: Math.floor(Math.random() * 30) + 60,
        severity: ['Mild', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)],
        confidence: Math.floor(Math.random() * 20) + 80,
        recommendations: [
          'Use a gentle cleanser',
          'Apply moisturizer daily',
          'Use SPF 30+ sunscreen',
          'Stay hydrated',
        ],
        ingredients: ['niacinamide', 'hyaluronic-acid', 'retinol'],
        imageUrl: selectedImage,
      };

      addAnalysis(analysis);
      setIsAnalyzing(false);
      setSelectedImage(null);
      navigation.navigate('Recommendations');
    }, 2000);
  };

  if (!selectedImage && permission?.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef} />
        <View style={styles.cameraControls}>
          <Button
            title="Take Photo"
            onPress={handleTakePhoto}
            size="lg"
            style={styles.button}
          />
          <Button
            title="Choose from Gallery"
            variant="outline"
            onPress={handlePickImage}
            size="lg"
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Skin Analysis</Text>
        <Text style={styles.description}>
          Take a clear photo or upload an image for AI analysis
        </Text>

        {selectedImage ? (
          <>
            <Card>
              <Image
                source={{ uri: selectedImage }}
                style={styles.previewImage}
              />
            </Card>

            {isAnalyzing ? (
              <View style={styles.analyzingContainer}>
                <ActivityIndicator size="large" color="#6B5FD9" />
                <Text style={styles.analyzingText}>Analyzing your skin...</Text>
              </View>
            ) : (
              <View style={styles.buttonsContainer}>
                <Button
                  title="Analyze"
                  onPress={handleAnalyze}
                  loading={isAnalyzing}
                  size="lg"
                  style={styles.button}
                />
                <Button
                  title="Choose Different Photo"
                  variant="outline"
                  onPress={() => setSelectedImage(null)}
                  size="lg"
                  style={styles.button}
                />
              </View>
            )}
          </>
        ) : (
          <View style={styles.uploadContainer}>
            <Card style={styles.uploadCard}>
              <View style={styles.uploadIcon}>
                <ImagePlus size={48} color="#6B5FD9" />
              </View>
              <Text style={styles.uploadTitle}>Upload Your Photo</Text>
              <Text style={styles.uploadDescription}>
                Take a clear photo of your face for best results
              </Text>

              <View style={styles.uploadButtons}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleTakePhoto}
                >
                  <Camera size={24} color="#6B5FD9" />
                  <Text style={styles.uploadButtonText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handlePickImage}
                >
                  <ImagePlus size={24} color="#6B5FD9" />
                  <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )}

        {/* Tips */}
        <Card variant="secondary">
          <Text style={styles.tipsTitle}>📸 Photo Tips</Text>
          <Text style={styles.tipItem}>• Use natural lighting</Text>
          <Text style={styles.tipItem}>• Make sure your face is clearly visible</Text>
          <Text style={styles.tipItem}>• Avoid extreme angles</Text>
          <Text style={styles.tipItem}>• Remove makeup for accurate analysis</Text>
        </Card>
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
  camera: {
    flex: 1,
  },
  cameraControls: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    marginBottom: 24,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  analyzingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  analyzingText: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    marginTop: 12,
  },
  uploadContainer: {
    marginBottom: 40,
  },
  uploadCard: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  uploadIcon: {
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadDescription: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  uploadButtons: {
    width: '100%',
    gap: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5D9FF',
    backgroundColor: '#F5F2FF',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#6B5FD9',
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    width: '100%',
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#666666',
    marginBottom: 8,
    lineHeight: 20,
  },
});
