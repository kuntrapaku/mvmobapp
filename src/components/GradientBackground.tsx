// src/components/GradientBackground.tsx
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function GradientBackground({ children, style }: Props) {
  return (
    <LinearGradient
      colors={['#ff758c', '#ff7eb3', '#ff9966']} // 🔥 Pink to Orange
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 16,
  },
});
