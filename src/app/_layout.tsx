import React from 'react';
import { Stack } from 'expo-router';
import { useFonts as useInterFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { useFonts as useManropeFonts, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FIGMA } from '@/constants/figma';

export default function RootLayout() {
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  const [manropeLoaded] = useManropeFonts({
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!interLoaded || !manropeLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: FIGMA.colors.app },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="budgets" />
        <Stack.Screen name="insights" />
        <Stack.Screen name="ledgers" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="add-transaction" />
        <Stack.Screen name="security-verification" />
      </Stack>
    </SafeAreaProvider>
  );
}
