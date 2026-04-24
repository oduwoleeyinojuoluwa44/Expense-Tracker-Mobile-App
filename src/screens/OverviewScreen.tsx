import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AllocationTile, LedgerItem, PrimaryButton, Section, SectionTitle } from '@/components/figma/Primitives';
import { ScreenShell } from '@/components/figma/ScreenShell';
import { allocations, ledgerRows } from '@/data/figma-content';
import { FIGMA } from '@/constants/figma';

export default function OverviewScreen() {
  const router = useRouter();

  return (
    <ScreenShell activeTab="overview">
      <View style={styles.balanceCard}>
        <View style={styles.balanceTop}>
          <Text style={styles.balanceEyebrow}>LIQUID WEALTH PORTFOLIO</Text>
          <View style={styles.changePill}>
            <Text style={styles.changeText}>+12.5%</Text>
          </View>
        </View>
        <View>
          <Text style={styles.balanceValue}>$42,950.40</Text>
          <Text style={styles.balanceCaption}>Market valuation as of today</Text>
        </View>
        <View style={styles.balanceActions}>
          <PrimaryButton label="DEPOSIT" onPress={() => router.push('/add-transaction')} />
          <PrimaryButton label="WITHDRAW" onPress={() => router.push('/add-transaction')} />
        </View>
        <View style={styles.balanceGlow} />
      </View>

      <View style={styles.quickAction}>
        {(['calendar-outline', 'create-outline', 'card-outline', 'wallet-outline'] as const).map((icon) => (
          <Pressable key={icon} style={styles.quickButton} onPress={() => router.push('/add-transaction')}>
            <Ionicons name={icon} size={18} color={FIGMA.colors.primaryDark} />
          </Pressable>
        ))}
      </View>

      <Section>
        <SectionTitle title="Allocations" action="View All" onAction={() => router.push('/budgets')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.allocationRail}>
          {allocations.map((item) => (
            <AllocationTile key={item.title} {...item} />
          ))}
        </ScrollView>
      </Section>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View>
            <Text style={styles.chartTitle}>Spending Trend</Text>
            <Text style={styles.chartDate}>Oct 1 - Oct 15, 2023</Text>
          </View>
          <View style={styles.dot} />
        </View>
        <View style={styles.lineChart}>
          <View style={[styles.curveSegment, styles.curveOne]} />
          <View style={[styles.curveSegment, styles.curveTwo]} />
          <View style={[styles.curveSegment, styles.curveThree]} />
        </View>
        <View style={styles.weekRow}>
          {['W1', 'W2', 'W3', 'W4'].map((week) => (
            <Text key={week} style={styles.weekText}>{week}</Text>
          ))}
        </View>
      </View>

      <View style={styles.savingsCard}>
        <Text style={styles.savingsTitle}>Savings</Text>
        {[
          { label: 'INVESTMENTS', value: 65, text: '65%', color: FIGMA.colors.primaryDark },
          { label: 'CASH SAVINGS', value: 25, text: '25%', color: '#2559bd' },
          { label: 'CRYPTO VAULT', value: 10, text: '10%', color: FIGMA.colors.success },
        ].map(({ label, value, text, color }) => (
          <View key={label} style={styles.savingsRow}>
            <View style={styles.savingsLabels}>
              <Text style={styles.savingsLabel}>{label}</Text>
              <Text style={styles.savingsValue}>{text}</Text>
            </View>
            <View style={styles.savingsTrack}>
              <View style={[styles.savingsFill, { width: `${value}%`, backgroundColor: color }]} />
            </View>
          </View>
        ))}
      </View>

      <Section>
        <SectionTitle title="Recent Ledger" action="VIEW ALL" onAction={() => router.push('/ledgers')} />
        <View style={styles.ledgerStack}>
          {ledgerRows.slice(0, 3).map(([name, meta, amount, date, tone]) => (
            <LedgerItem key={name} name={name} meta={meta} amount={amount} date={date} tone={tone} />
          ))}
        </View>
      </Section>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: FIGMA.colors.primary,
    ...FIGMA.shadow,
  },
  balanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  balanceEyebrow: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
    fontWeight: '700',
  },
  changePill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(78,222,163,0.2)',
  },
  changeText: {
    color: FIGMA.colors.success,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  balanceValue: {
    color: FIGMA.colors.surface,
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  balanceCaption: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 8,
  },
  balanceGlow: {
    position: 'absolute',
    right: -48,
    top: -48,
    width: 192,
    height: 192,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  quickAction: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    backgroundColor: FIGMA.colors.surface,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  quickButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: FIGMA.colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    ...FIGMA.shadow,
  },
  allocationRail: {
    gap: 8,
    paddingRight: 24,
  },
  chartCard: {
    width: '100%',
    minHeight: 256,
    borderRadius: 20,
    padding: 24,
    backgroundColor: FIGMA.colors.surface,
    ...FIGMA.shadow,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartTitle: {
    color: FIGMA.colors.text,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  chartDate: {
    color: FIGMA.colors.faint,
    fontSize: 11,
    lineHeight: 18,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: FIGMA.colors.primary,
  },
  lineChart: {
    height: 126,
    marginTop: 24,
    justifyContent: 'center',
  },
  curveSegment: {
    position: 'absolute',
    borderColor: FIGMA.colors.primary,
    borderTopWidth: 4,
    borderRadius: 100,
  },
  curveOne: {
    left: 0,
    top: 64,
    width: 94,
    height: 58,
    transform: [{ rotate: '-18deg' }],
  },
  curveTwo: {
    left: 80,
    top: 54,
    width: 92,
    height: 48,
    transform: [{ rotate: '16deg' }],
  },
  curveThree: {
    left: 164,
    top: 28,
    width: 112,
    height: 92,
    transform: [{ rotate: '-10deg' }],
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekText: {
    color: FIGMA.colors.faint,
    fontSize: 10,
  },
  savingsCard: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    gap: 16,
    backgroundColor: FIGMA.colors.surface,
    ...FIGMA.shadow,
  },
  savingsTitle: {
    color: FIGMA.colors.text,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
  },
  savingsRow: {
    gap: 8,
  },
  savingsLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  savingsLabel: {
    color: FIGMA.colors.muted,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  savingsValue: {
    color: FIGMA.colors.text,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  savingsTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: FIGMA.colors.divider,
    overflow: 'hidden',
  },
  savingsFill: {
    height: 8,
    borderRadius: 999,
  },
  ledgerStack: {
    gap: 16,
  },
});
