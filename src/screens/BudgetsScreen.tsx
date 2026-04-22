import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AllocationTile, MutedButton, Section, SectionTitle } from '@/components/figma/Primitives';
import { ScreenShell } from '@/components/figma/ScreenShell';
import { FIGMA } from '@/constants/figma';

const categories = [
  { title: 'Housing', spent: '$2,450', limit: '/ $2,500', badge: 'AT LIMIT', used: 'USED 98%', left: '-$50 LEFT', progress: 98, tone: 'red' },
  { title: 'Dining Out', spent: '$420', limit: '/ $850', badge: 'HEALTHY', used: 'USED 49%', left: '+$430 LEFT', progress: 49, tone: 'blue' },
  { title: 'Groceries', spent: '$680', limit: '/ $1,200', badge: 'ON TRACK', used: 'USED 56%', left: '+$520 LEFT', progress: 56, tone: 'blue' },
  { title: 'Transport', spent: '$215', limit: '/ $400', badge: '', used: 'USED 53%', left: '+$185 LEFT', progress: 53, tone: 'blue' },
];

export default function BudgetsScreen() {
  const router = useRouter();

  return (
    <ScreenShell activeTab="budgets" topPadding={96}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>MONTHLY OVERVIEW</Text>
        <Text style={styles.title}>September Budgets</Text>
        <Text style={styles.body}>
          You have utilized 64% of your total monthly allowance. Your trajectory suggests you will
          remain within limits by month-end.
        </Text>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Spent</Text>
          <Text style={styles.totalValue}>$4,280.00</Text>
          <Text style={styles.totalSub}>of $6,700.00 total budget</Text>
        </View>
        <View style={styles.actions}>
          <MutedButton label="Add New Category" onPress={() => router.push('/add-transaction')} />
          <MutedButton label="Edit Budgets" />
        </View>
      </View>

      <Section>
        <View style={styles.sortRow}>
          <Text style={styles.sortText}>Sort by: Usage %</Text>
        </View>
        <View style={styles.categoryStack}>
          {categories.map((item) => (
            <View key={item.title} style={styles.categoryCard}>
              <View style={styles.categoryTop}>
                <Text style={[styles.badge, item.tone === 'red' && styles.badgeRed]}>{item.badge}</Text>
                <Text style={styles.categoryTitle}>{item.title}</Text>
              </View>
              <View style={styles.moneyRow}>
                <Text style={styles.spent}>{item.spent}</Text>
                <Text style={styles.limit}>{item.limit}</Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.progress}%`,
                      backgroundColor: item.tone === 'red' ? FIGMA.colors.danger : FIGMA.colors.primaryDark,
                    },
                  ]}
                />
              </View>
              <View style={styles.categoryBottom}>
                <Text style={styles.used}>{item.used}</Text>
                <Text style={[styles.left, item.tone === 'red' && styles.leftRed]}>{item.left}</Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <View style={styles.suggestion}>
        <Text style={styles.goal}>75% GOAL</Text>
        <Text style={styles.suggestionTitle}>Smart Allocation{'\n'}Detected</Text>
        <Text style={styles.body}>
          We noticed you have spent 40% less on Transport this month. Would you like to re-allocate
          $150 towards your Vacation Fund?
        </Text>
        <MutedButton label="Allocate Now" onPress={() => router.push('/add-transaction')} />
      </View>
    </ScreenShell>
  );
}

export function AllocationListScreen() {
  return (
    <ScreenShell activeTab="budgets">
      <Section>
        <SectionTitle title="Allocations" action="View All" />
        <View style={styles.allocGrid}>
          {[
            ['Utilities', '$150', '$100 LEFT', 60],
            ['Entertainment', '$200', '$100 LEFT', 50],
            ['Groceries', '$250', '$75 LEFT', 75],
            ['Transportation', '$100', '$50 LEFT', 70],
            ['Health & Fitness', '$120', '$30 LEFT', 80],
            ['Clothing', '$180', '$60 LEFT', 65],
          ].map(([title, amount, left, progress]) => (
            <AllocationTile
              key={title as string}
              title={title as string}
              amount={amount as string}
              left={left as string}
              progress={progress as number}
            />
          ))}
        </View>
      </Section>
      <View style={styles.newEntry}>
        <Text style={styles.title}>New Entry</Text>
        <Text style={styles.body}>Record a new Allocation</Text>
        <Text style={styles.quickAdd}>Quick Add</Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 16,
  },
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
  body: {
    color: FIGMA.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  totalCard: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: FIGMA.colors.surface,
    ...FIGMA.shadow,
  },
  totalLabel: {
    color: FIGMA.colors.muted,
    fontSize: 12,
    lineHeight: 16,
  },
  totalValue: {
    color: FIGMA.colors.primaryDark,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800',
  },
  totalSub: {
    color: FIGMA.colors.faint,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  sortRow: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sortText: {
    color: FIGMA.colors.muted,
    fontSize: 12,
    lineHeight: 16,
  },
  categoryStack: {
    gap: 16,
  },
  categoryCard: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: FIGMA.colors.surface,
    gap: 10,
    ...FIGMA.shadow,
  },
  categoryTop: {
    gap: 6,
  },
  badge: {
    color: FIGMA.colors.green,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  badgeRed: {
    color: FIGMA.colors.danger,
  },
  categoryTitle: {
    color: FIGMA.colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  moneyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  spent: {
    color: FIGMA.colors.primaryDark,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
  },
  limit: {
    color: FIGMA.colors.muted,
    fontSize: 14,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: FIGMA.colors.divider,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
  },
  categoryBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  used: {
    color: FIGMA.colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  left: {
    color: FIGMA.colors.green,
    fontSize: 11,
    fontWeight: '700',
  },
  leftRed: {
    color: FIGMA.colors.danger,
  },
  suggestion: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: FIGMA.colors.surface,
    gap: 14,
    ...FIGMA.shadow,
  },
  goal: {
    color: FIGMA.colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  suggestionTitle: {
    color: FIGMA.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
  },
  allocGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  newEntry: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: FIGMA.colors.surface,
    gap: 8,
  },
  quickAdd: {
    color: FIGMA.colors.primaryDark,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
});
