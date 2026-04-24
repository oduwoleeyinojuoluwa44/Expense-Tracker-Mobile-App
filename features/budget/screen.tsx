import { CategoryPickerCard } from '@/features/budget/components/category-picker-card';
import { CategorySummarySection } from '@/features/budget/components/category-summary-section';
import { MonthlyBurnCard } from '@/features/budget/components/monthly-burn-card';
import { SpendingVelocityCard } from '@/features/budget/components/spending-velocity-card';
import { LedgerHeader } from '@/features/overview/components/ledger-header';
import { budgetStyles as styles } from '@/features/budget/styles/budget';
import { useRouter, type Href } from 'expo-router';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <MonthlyBurnCard />
        <SpendingVelocityCard />
        <CategoryPickerCard
          onSelectCategory={(categoryId) => {
            Alert.alert('Category selected', `Active category: ${categoryId}`);
          }}
          onPressAddCategory={() => {
            router.push('/(budgets)/new-category' as Href);
          }}
        />
        <CategorySummarySection
          onPressViewAll={() => {
            router.push('/(budgets)/categories' as Href);
          }}
          onPressCategory={(categoryId) => {
            Alert.alert('Category details', `Open details for: ${categoryId}`);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
