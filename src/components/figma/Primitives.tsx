import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { FIGMA } from '@/constants/figma';

export function Section({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.section, style]}>{children}</View>;
}

export function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function AllocationTile({
  title,
  amount,
  left,
  progress,
  tone = 'blue',
  icon = 'card-outline',
}: {
  title: string;
  amount: string;
  left: string;
  progress: number;
  tone?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const barColor = tone === 'red' ? FIGMA.colors.danger : FIGMA.colors.primaryDark;

  return (
    <View style={styles.allocationTile}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={14} color={FIGMA.colors.primaryDark} />
      </View>
      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileAmount}>{amount}</Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={[styles.tileLeft, tone === 'red' && styles.dangerText]}>{left}</Text>
    </View>
  );
}

export function LedgerItem({
  name,
  meta,
  amount,
  date,
  tone,
}: {
  name: string;
  meta: string;
  amount: string;
  date: string;
  tone: 'red' | 'green';
}) {
  return (
    <View style={styles.ledgerItem}>
      <View style={styles.ledgerIcon}>
        <Ionicons
          name={tone === 'green' ? 'wallet-outline' : 'bag-handle-outline'}
          size={18}
          color={tone === 'green' ? FIGMA.colors.success : FIGMA.colors.primaryDark}
        />
      </View>
      <View style={styles.ledgerCopy}>
        <Text style={styles.ledgerName}>{name}</Text>
        <Text style={styles.ledgerMeta}>{meta}</Text>
      </View>
      <View style={styles.ledgerRight}>
        <Text style={[styles.ledgerAmount, tone === 'green' ? styles.greenText : styles.dangerText]}>
          {amount}
        </Text>
        <Text style={styles.ledgerDate}>{date}</Text>
      </View>
    </View>
  );
}

export function SettingRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.settingRow}>
      <View>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={FIGMA.colors.faint} />
    </View>
  );
}

export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function MutedButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.mutedButton}>
      <Text style={styles.mutedButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    color: FIGMA.colors.text,
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  sectionAction: {
    color: FIGMA.colors.primaryDark,
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  allocationTile: {
    width: 163,
    borderRadius: 20,
    padding: 16,
    gap: 4,
    backgroundColor: FIGMA.colors.surfaceMuted,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: FIGMA.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileTitle: {
    marginTop: 8,
    color: FIGMA.colors.text,
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  tileAmount: {
    color: FIGMA.colors.primaryDark,
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: FIGMA.colors.divider,
  },
  progressFill: {
    height: 6,
    borderRadius: 999,
  },
  tileLeft: {
    color: '#434653',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '700',
  },
  ledgerItem: {
    minHeight: 80,
    borderRadius: 16,
    padding: 16,
    backgroundColor: FIGMA.colors.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  ledgerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: FIGMA.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...FIGMA.shadow,
  },
  ledgerCopy: {
    flex: 1,
    gap: 6,
  },
  ledgerName: {
    color: FIGMA.colors.text,
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  ledgerMeta: {
    color: FIGMA.colors.muted,
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
  },
  ledgerRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  ledgerAmount: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  ledgerDate: {
    color: FIGMA.colors.faint,
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
  },
  settingRow: {
    minHeight: 64,
    borderRadius: 16,
    padding: 16,
    backgroundColor: FIGMA.colors.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingTitle: {
    color: FIGMA.colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  settingSubtitle: {
    color: FIGMA.colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
  },
  primaryButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  primaryButtonText: {
    color: FIGMA.colors.surface,
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    fontWeight: '700',
  },
  mutedButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FIGMA.colors.surfaceMuted,
  },
  mutedButtonText: {
    color: FIGMA.colors.primaryDark,
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    fontWeight: '700',
  },
  dangerText: {
    color: FIGMA.colors.danger,
  },
  greenText: {
    color: FIGMA.colors.green,
  },
});
