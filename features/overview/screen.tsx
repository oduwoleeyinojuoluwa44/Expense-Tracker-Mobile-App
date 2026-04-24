import { AllocationsSection } from '@/features/overview/components/allocations-section';
import { LedgerHeader } from '@/features/overview/components/ledger-header';
import { LiquidWealthSummaryCard } from '@/features/overview/components/liquid-wealth-summary-card';
import { QuickActionFab } from '@/features/overview/components/quick-action-fab';
import { RecentLedgerSection } from '@/features/overview/components/recent-ledger-section';
import { SpendingTrendCard } from '@/features/overview/components/spending-trend-card';
import { overviewStyles as styles } from '@/features/overview/styles/overview';
import { useRouter, type Href } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OverviewScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.overviewInner}>
        <ScrollView
          contentContainerStyle={styles.container}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          <LedgerHeader />
          <LiquidWealthSummaryCard />
          <AllocationsSection onPressViewAll={() => router.push('/(home)/allocations' as Href)} />
          <SpendingTrendCard />
          <RecentLedgerSection />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>This week</Text>
            <Text style={styles.cardBody}>
              Connect your bank or add expenses manually to populate this screen. The layout and typography follow your
              Manrope system styles.
            </Text>
          </View>
        </ScrollView>
        <QuickActionFab />
      </View>
    </SafeAreaView>
  );
}
