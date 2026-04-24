import { CategoryPickerCard } from '@/features/budget/components/category-picker-card';
import { CategorySummarySection } from '@/features/budget/components/category-summary-section';
import { MonthlyBurnCard } from '@/features/budget/components/monthly-burn-card';
import { SpendingVelocityCard } from '@/features/budget/components/spending-velocity-card';
import { LedgerHeader } from '@/features/overview/components/ledger-header';
import { budgetStyles as styles } from '@/features/budget/styles/budget';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetScreen() {
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
            Alert.alert('Add category', 'Category creation flow can be connected here.');
          }}
        />
        <CategorySummarySection
          onPressViewAll={() => {
            Alert.alert('Categories', 'Opening full category list...');
          }}
          onPressCategory={(categoryId) => {
            Alert.alert('Category details', `Open details for: ${categoryId}`);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
