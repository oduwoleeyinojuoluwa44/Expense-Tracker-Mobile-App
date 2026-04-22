import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AllocationTile, MutedButton, Section, SectionTitle } from '@/components/figma/Primitives';
import { ScreenShell } from '@/components/figma/ScreenShell';
import { allocations } from '@/data/figma-content';
import { FIGMA } from '@/constants/figma';

export default function InsightsScreen() {
  const router = useRouter();

  return (
    <ScreenShell activeTab="insights" topPadding={96}>
      <View>
        <Text style={styles.eyebrow}>PERFORMANCE ANALYTICS</Text>
        <Text style={styles.title}>Financial Insights</Text>
      </View>

      <View style={styles.tabs}>
        {['Daily', 'Weekly', 'Monthly'].map((label) => (
          <View key={label} style={[styles.tab, label === 'Monthly' && styles.tabActive]}>
            <Text style={[styles.tabText, label === 'Monthly' && styles.tabTextActive]}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.velocityCard}>
        <Text style={styles.cardTitle}>Spending Velocity</Text>
        <Text style={styles.subtle}>Trend relative to baseline</Text>
        <Text style={styles.velocity}>12.4%</Text>
        <View style={styles.barRow}>
          {[36, 58, 44, 70, 92, 62, 80].map((height, index) => (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${height}%` }]} />
              </View>
              <Text style={styles.day}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][index]}</Text>
            </View>
          ))}
        </View>
      </View>

      <Section>
        <SectionTitle title="Allocations" action="View All" onAction={() => router.push('/budgets')} />
        <View style={styles.allocGrid}>
          {allocations.map((item) => (
            <AllocationTile key={item.title} {...item} />
          ))}
        </View>
      </Section>

      <View style={styles.burnCard}>
        <Text style={styles.status}>ON TRACK</Text>
        <Text style={styles.cardTitle}>Total Monthly Burn</Text>
        <Text style={styles.threshold}>MONTHLY THRESHOLD:{'\n'}$12,500.00</Text>
        <Text style={styles.burnValue}>$8,240<Text style={styles.cents}>.00</Text></Text>
        <Text style={styles.subtle}>65.9% utilized</Text>
      </View>

      <View style={styles.allocationCard}>
        <Text style={styles.cardTitle}>Allocation</Text>
        <Text style={styles.total}>TOTAL   $14.2k</Text>
        {[
          ['Housing & Utilities', '45%'],
          ['Investments', '25%'],
          ['Lifestyle', '15%'],
          ['Others', '15%'],
        ].map(([label, value]) => (
          <View key={label} style={styles.splitRow}>
            <Text style={styles.splitLabel}>{label}</Text>
            <Text style={styles.splitValue}>{value}</Text>
          </View>
        ))}
      </View>

      <Section>
        <SectionTitle title="Smart Suggestions" action="View All" />
        <View style={styles.suggestionStack}>
          <View style={styles.suggestion}>
            <Text style={styles.suggestionTitle}>Optimize Subscriptions</Text>
            <Text style={styles.impact}>HIGH IMPACT</Text>
            <Text style={styles.body}>
              You have 3 overlapping streaming services. Consolidating could save you $34.99/mo.
            </Text>
            <MutedButton label="Take Action" />
          </View>
          <View style={styles.suggestion}>
            <Text style={styles.suggestionTitle}>Investment Rebalance</Text>
            <Text style={styles.impact}>STRATEGY</Text>
            <Text style={styles.body}>
              Your Lifestyle allocation is exceeding targets. Shift $200 to your index fund.
            </Text>
            <MutedButton label="Review Portfolio" />
          </View>
        </View>
      </Section>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: FIGMA.colors.primaryDark,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: FIGMA.colors.text,
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '800',
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: FIGMA.colors.surfaceMuted,
  },
  tabActive: {
    backgroundColor: FIGMA.colors.primaryDark,
  },
  tabText: {
    color: FIGMA.colors.muted,
    fontWeight: '700',
  },
  tabTextActive: {
    color: FIGMA.colors.surface,
  },
  velocityCard: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: FIGMA.colors.surface,
    gap: 8,
    ...FIGMA.shadow,
  },
  cardTitle: {
    color: FIGMA.colors.text,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
  },
  subtle: {
    color: FIGMA.colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  velocity: {
    color: FIGMA.colors.primaryDark,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
  },
  barRow: {
    height: 164,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 999,
    backgroundColor: FIGMA.colors.surfaceMuted,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 999,
    backgroundColor: FIGMA.colors.primaryDark,
  },
  day: {
    color: FIGMA.colors.faint,
    fontSize: 10,
    fontWeight: '700',
  },
  allocGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  burnCard: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: FIGMA.colors.surface,
    gap: 8,
    ...FIGMA.shadow,
  },
  status: {
    color: FIGMA.colors.green,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  threshold: {
    color: FIGMA.colors.muted,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1,
  },
  burnValue: {
    color: FIGMA.colors.primaryDark,
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '800',
  },
  cents: {
    fontSize: 22,
  },
  allocationCard: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: FIGMA.colors.surface,
    gap: 14,
    ...FIGMA.shadow,
  },
  total: {
    color: FIGMA.colors.primaryDark,
    fontSize: 20,
    fontWeight: '800',
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitLabel: {
    color: FIGMA.colors.muted,
    fontSize: 13,
  },
  splitValue: {
    color: FIGMA.colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  suggestionStack: {
    gap: 16,
  },
  suggestion: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: FIGMA.colors.surfaceMuted,
    gap: 8,
  },
  suggestionTitle: {
    color: FIGMA.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  impact: {
    color: FIGMA.colors.primaryDark,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  body: {
    color: FIGMA.colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
});
