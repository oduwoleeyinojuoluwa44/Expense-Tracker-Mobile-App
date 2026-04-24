import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { FIGMA, MAIN_TABS, type MainTab } from '@/constants/figma';

type Props = {
  activeTab?: MainTab;
  children: React.ReactNode;
  nav?: boolean;
  topPadding?: number;
  bottomPadding?: number;
};

export function ScreenShell({
  activeTab,
  children,
  nav = true,
  topPadding = 80,
  bottomPadding = 176,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.frame}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.main,
          {
            paddingTop: topPadding,
            paddingBottom: nav ? Math.max(bottomPadding, 126 + insets.bottom) : bottomPadding,
          },
        ]}>
        {children}
      </ScrollView>
      {nav ? <BottomNav activeTab={activeTab} /> : null}
    </View>
  );
}

export function Header() {
  return (
    <SafeAreaView edges={['top']} style={styles.headerSafe}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.avatar}>
            <View style={styles.avatarInner} />
          </View>
          <Text style={styles.brandText}>Sovereign Ledger</Text>
        </View>
        <View style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={18} color={FIGMA.colors.primaryDark} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function BottomNav({ activeTab }: { activeTab?: MainTab }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.nav, { paddingBottom: 32 + Math.max(insets.bottom - 12, 0) }]}>
      {MAIN_TABS.map((item) => {
        const active = item.key === activeTab;
        return (
          <Pressable
            key={item.key}
            onPress={() => router.push(item.route)}
            style={({ pressed }) => [
              styles.navLink,
              active && styles.navLinkActive,
              pressed && styles.pressed,
            ]}>
            <Ionicons
              name={item.icon}
              size={18}
              color={active ? FIGMA.colors.primary : FIGMA.colors.faint}
            />
            <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: FIGMA.colors.app,
  },
  main: {
    paddingHorizontal: 24,
    rowGap: 32,
  },
  headerSafe: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 4,
    backgroundColor: FIGMA.colors.header,
  },
  header: {
    height: 64,
    paddingHorizontal: 24,
    backgroundColor: FIGMA.colors.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: FIGMA.colors.surfaceMuted,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: '#dae2ff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: FIGMA.colors.primaryDark,
  },
  brandText: {
    color: FIGMA.colors.primaryDark,
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: FIGMA.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...FIGMA.shadow,
  },
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 101,
    paddingTop: 12,
    paddingHorizontal: 18,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    ...FIGMA.shadow,
  },
  navLink: {
    minWidth: 72,
    minHeight: 53,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  navLinkActive: {
    backgroundColor: 'rgba(0, 71, 171, 0.1)',
  },
  navLabel: {
    marginTop: 4,
    color: FIGMA.colors.faint,
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Inter_700Bold',
    fontWeight: '700',
    letterSpacing: 1,
  },
  navLabelActive: {
    color: FIGMA.colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
});
