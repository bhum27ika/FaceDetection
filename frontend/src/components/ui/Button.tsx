import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const variantStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    outline: styles.outline,
  };

  const sizeStyles = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
  };

  const variantTextStyles = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    outline: styles.outlineText,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#6B5FD9' : '#FFFFFF'} />
      ) : (
        <>
          {icon && icon}
          <Text style={[variantTextStyles[variant], sizeStyles[size], textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primary: {
    backgroundColor: '#6B5FD9',
  },
  secondary: {
    backgroundColor: '#30B0C0',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
  },
  outlineText: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
  },
  disabled: {
    opacity: 0.5,
  },
});
