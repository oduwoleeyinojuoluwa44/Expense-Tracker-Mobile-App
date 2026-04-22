import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenShell } from '@/components/figma/ScreenShell';
import { FIGMA } from '@/constants/figma';

export default function AddTransactionScreen() {
  const router = useRouter();

  return (
    <ScreenShell nav={false} topPadding={96} bottomPadding={32}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>LEDGER</Text>
        <Text style={styles.title}>New Transaction</Text>
      </View>
      <View style={styles.segment}>
        <Text style={[styles.segmentText, styles.segmentActive]}>Expense</Text>
        <Text style={styles.segmentText}>Income</Text>
      </View>
      <View style={styles.amountBlock}>
        <Text style={styles.label}>AMOUNT</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.amount}>0.00</Text>
          <Text style={styles.currency}>USD</Text>
        </View>
      </View>
      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((key) => (
          <View key={key} style={styles.key}>
            <Text style={styles.keyText}>{key}</Text>
          </View>
        ))}
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>CATEGORY</Text>
        <View style={styles.chips}>
          {['Food', 'Travel', 'Salary', 'Shop', 'Home', 'Other'].map((category) => (
            <View key={category} style={styles.chip}>
              <Text style={styles.chipText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>DATE</Text>
        <Text style={styles.date}>11 / 24 / 2023</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>NOTES</Text>
        <Text style={styles.note}>What was this for?</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Recurring Transaction</Text>
        <View style={styles.chips}>
          {['Daily', 'Weekly', 'Monthly'].map((period) => (
            <View key={period} style={styles.chip}>
              <Text style={styles.chipText}>{period}</Text>
            </View>
          ))}
        </View>
      </View>
      <Pressable style={styles.save} onPress={() => router.push('/ledgers')}>
        <Text style={styles.saveText}>Save Transaction</Text>
      </Pressable>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
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
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
  },
  segment: {
    borderRadius: 16,
    padding: 6,
    backgroundColor: FIGMA.colors.surfaceMuted,
    flexDirection: 'row',
  },
  segmentText: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    textAlign: 'center',
    color: FIGMA.colors.muted,
    fontWeight: '700',
  },
  segmentActive: {
    backgroundColor: FIGMA.colors.surface,
    color: FIGMA.colors.primaryDark,
  },
  amountBlock: {
    alignItems: 'center',
    gap: 12,
  },
  label: {
    color: FIGMA.colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  currency: {
    color: FIGMA.colors.muted,
    fontSize: 16,
    fontWeight: '700',
  },
  amount: {
    color: FIGMA.colors.text,
    fontSize: 52,
    lineHeight: 62,
    fontWeight: '800',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  key: {
    width: 104,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FIGMA.colors.surface,
    ...FIGMA.shadow,
  },
  keyText: {
    color: FIGMA.colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  block: {
    gap: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    minWidth: 100,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: FIGMA.colors.surface,
    alignItems: 'center',
    ...FIGMA.shadow,
  },
  chipText: {
    color: FIGMA.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  date: {
    color: FIGMA.colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  note: {
    minHeight: 96,
    borderRadius: 20,
    padding: 18,
    color: FIGMA.colors.faint,
    backgroundColor: FIGMA.colors.surface,
  },
  save: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: FIGMA.colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: FIGMA.colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
});
