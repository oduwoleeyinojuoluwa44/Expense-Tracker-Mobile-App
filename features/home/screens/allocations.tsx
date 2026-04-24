import { AllocationCard } from '@/features/home/components/allocation-card';
import { AllocationFilterTabs } from '@/features/home/components/allocation-filter-tabs';
import { ALLOCATIONS, ALLOCATION_FILTERS, type AllocationFilter } from '@/features/home/components/allocation-types';
import { HomeTopHeader } from '@/features/home/components/home-top-header';
import { NewAllocationCard } from '@/features/home/components/new-allocation-card';
import { allocationStyles as styles } from '@/features/home/styles/allocation';
import { useRouter, type Href } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllocationsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<AllocationFilter>('All');

  const filteredAllocations = useMemo(() => {
    if (activeFilter === 'All') return ALLOCATIONS;
    return ALLOCATIONS.filter((item) => item.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <HomeTopHeader title="Allocation" />
        <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
          <AllocationFilterTabs filters={ALLOCATION_FILTERS} activeFilter={activeFilter} onChangeFilter={setActiveFilter} />

          {filteredAllocations.map((item) => (
            <AllocationCard
              key={item.id}
              item={item}
              onPress={() => {
                router.push({
                  pathname: '/(home)/allocation-ledger',
                  params: { allocationId: item.id, allocationName: item.title },
                } as unknown as Href);
              }}
            />
          ))}

          <NewAllocationCard
            onPressQuickAdd={() => {
              router.push('/(home)/add-transaction' as Href);
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
