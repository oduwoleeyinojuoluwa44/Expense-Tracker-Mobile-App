import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Section, SettingRow } from '@/components/figma/Primitives';
import { ScreenShell } from '@/components/figma/ScreenShell';
import { FIGMA } from '@/constants/figma';
import { settingGroups } from '@/data/figma-content';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScreenShell activeTab="settings" topPadding={96}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AS</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>Alexander Sterling</Text>
          <Text style={styles.member}>PRO MEMBER</Text>
          <Text style={styles.meta}>Default Ledger</Text>
          <Text style={styles.meta}>Main Savings</Text>
        </View>
      </View>

      <View style={styles.upgrade}>
        <Text style={styles.upgradeText}>Upgrade to Sovereign</Text>
        <Text style={styles.executive}>Executive</Text>
      </View>

      {settingGroups.map((group) => (
        <Section key={group.title}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <View style={styles.groupStack}>
            {group.rows.map(([title, subtitle]) => (
              <SettingRow key={title} title={title} subtitle={subtitle} />
            ))}
          </View>
        </Section>
      ))}

      <Pressable style={styles.signOut} onPress={() => router.push('/')}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
      <Text style={styles.version}>SOVEREIGN LEDGER V2.4.0</Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: FIGMA.colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: FIGMA.colors.surface,
    fontSize: 24,
    fontWeight: '800',
  },
  profileCopy: {
    gap: 3,
  },
  name: {
    color: FIGMA.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
  },
  member: {
    color: FIGMA.colors.primaryDark,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  meta: {
    color: FIGMA.colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  upgrade: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: FIGMA.colors.primaryDark,
    ...FIGMA.shadow,
  },
  upgradeText: {
    color: FIGMA.colors.surface,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
  },
  executive: {
    color: FIGMA.colors.success,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  groupTitle: {
    color: FIGMA.colors.primaryDark,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  groupStack: {
    gap: 12,
  },
  signOut: {
    minHeight: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FIGMA.colors.surfaceMuted,
  },
  signOutText: {
    color: FIGMA.colors.danger,
    fontSize: 15,
    fontWeight: '700',
  },
  version: {
    color: FIGMA.colors.faint,
    textAlign: 'center',
    fontSize: 11,
    letterSpacing: 1,
  },
});
