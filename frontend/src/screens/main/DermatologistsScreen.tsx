import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Phone, Star, CheckCircle2 } from 'lucide-react-native';

const DERMATOLOGISTS = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: ['Acne', 'Sensitive Skin'],
    rating: 4.8,
    reviews: 120,
    distance: '0.5 km',
    phone: '+1-555-0101',
    address: '123 Medical Center, City',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. James Smith',
    specialty: ['Anti-Aging', 'Wrinkles'],
    rating: 4.6,
    reviews: 95,
    distance: '1.2 km',
    phone: '+1-555-0102',
    address: '456 Health Plaza, City',
    available: true,
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialty: ['Acne', 'Eczema', 'Psoriasis'],
    rating: 4.9,
    reviews: 150,
    distance: '2.1 km',
    phone: '+1-555-0103',
    address: '789 Medical Tower, City',
    available: false,
  },
];

export default function DermatologistsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const filteredDermatologists = DERMATOLOGISTS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      user?.skinConcerns?.some(concern =>
        doc.specialty.some(spec => spec.toLowerCase().includes(concern.toLowerCase()))
      ) ?? true;
    return matchesSearch && matchesSpecialty;
  });

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMessage = (phone: string) => {
    Linking.openURL(`sms:${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Find Dermatologists</Text>

        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        {user?.skinConcerns && (
          <Card variant="secondary">
            <Text style={styles.filterLabel}>Specialists for Your Concerns</Text>
            <View style={styles.concernsTags}>
              {user.skinConcerns.map(concern => (
                <View key={concern} style={styles.concernTag}>
                  <Text style={styles.concernTagText}>{concern}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {filteredDermatologists.length > 0 ? (
          filteredDermatologists.map(doctor => (
            <Card key={doctor.id}>
              <View style={styles.doctorHeader}>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFB800" fill="#FFB800" />
                    <Text style={styles.ratingText}>
                      {doctor.rating} ({doctor.reviews} reviews)
                    </Text>
                  </View>
                </View>
                {doctor.available && <CheckCircle2 size={20} color="#4CAF50" />}
              </View>

              <View style={styles.specialtyContainer}>
                {doctor.specialty.map(spec => (
                  <View key={spec} style={styles.specialtyTag}>
                    <Text style={styles.specialtyTagText}>{spec}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.detailRow}>
                <MapPin size={16} color="#666666" />
                <Text style={styles.detailText}>
                  {doctor.distance} • {doctor.address}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <Button
                  title="Call"
                  onPress={() => handleCall(doctor.phone)}
                  variant="primary"
                  size="sm"
                  style={styles.actionButton}
                />
                <Button
                  title="Message"
                  onPress={() => handleMessage(doctor.phone)}
                  variant="outline"
                  size="sm"
                  style={styles.actionButton}
                />
              </View>
            </Card>
          ))
        ) : (
          <Card>
            <Text style={styles.noResults}>No dermatologists found</Text>
          </Card>
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
  searchInput: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 12,
    fontFamily: 'Geist-Bold',
    color: '#666666',
    marginBottom: 8,
  },
  concernsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  concernTag: {
    backgroundColor: '#D0F0F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  concernTagText: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#30B0C0',
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#666666',
  },
  specialtyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  specialtyTag: {
    backgroundColor: '#E5D9FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyTagText: {
    fontSize: 11,
    fontFamily: 'Geist',
    color: '#6B5FD9',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Geist',
    color: '#666666',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  noResults: {
    fontSize: 14,
    fontFamily: 'Geist',
    color: '#999999',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
