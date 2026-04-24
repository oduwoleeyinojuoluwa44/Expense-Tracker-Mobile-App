import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { LedgerItem, Section, SectionTitle } from '@/components/figma/Primitives';
import { ScreenShell } from '@/components/figma/ScreenShell';
import { ledgerRows } from '@/data/figma-content';

export default function LedgersScreen() {
  const router = useRouter();

  return (
    <ScreenShell activeTab="overview">
      <Section>
        <SectionTitle title="Recent Ledger" action="VIEW ALL" onAction={() => router.push('/ledgers')} />
        <View style={styles.stack}>
          {ledgerRows.map(([name, meta, amount, date, tone]) => (
            <LedgerItem key={name} name={name} meta={meta} amount={amount} date={date} tone={tone} />
          ))}
        </View>
      </Section>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});
