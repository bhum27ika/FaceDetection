import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'primary' | 'secondary';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  const variantStyles = {
    default: styles.default,
    primary: styles.primary,
    secondary: styles.secondary,
  };

  return (
    <View style={[styles.card, variantStyles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  default: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  primary: {
    backgroundColor: '#F5F2FF',
    borderWidth: 1,
    borderColor: '#E5D9FF',
  },
  secondary: {
    backgroundColor: '#E8F7F9',
    borderWidth: 1,
    borderColor: '#D0F0F5',
  },
});
