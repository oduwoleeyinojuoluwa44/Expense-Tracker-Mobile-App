import { HomeTopHeader } from '@/features/home/components/home-top-header';
import { NewAllocationCard } from '@/features/home/components/new-allocation-card';
import { RecentLedgerList } from '@/features/overview/components/recent-ledger-list';
import { overviewStyles as overviewStyles } from '@/features/overview/styles/overview';
import { useRouter, type Href } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecentLedgersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={overviewStyles.safeArea} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <HomeTopHeader title="Recent Ledgers" />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
          <RecentLedgerList />
          <View style={{ marginTop: 24 }}>
            <NewAllocationCard
              onPressQuickAdd={() => {
                router.push('/(home)/add-transaction' as Href);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
