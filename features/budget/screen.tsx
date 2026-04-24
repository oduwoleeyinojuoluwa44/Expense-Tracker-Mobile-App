import { CategoryPickerCard } from '@/features/budget/components/category-picker-card';
import { CategorySummarySection } from '@/features/budget/components/category-summary-section';
import { MonthlyBurnCard } from '@/features/budget/components/monthly-burn-card';
import { SpendingVelocityCard } from '@/features/budget/components/spending-velocity-card';
import { useBudgetCategories } from '@/features/budget/context/budget-categories';
import { LedgerHeader } from '@/features/overview/components/ledger-header';
import { budgetStyles as styles } from '@/features/budget/styles/budget';
import { useRouter, type Href } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetScreen() {
  const router = useRouter();
  const { categories, selectedCategoryId, selectCategory } = useBudgetCategories();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <MonthlyBurnCard />
        <SpendingVelocityCard />
        <CategoryPickerCard
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={selectCategory}
          onPressAddCategory={() => {
            router.push('/(budgets)/new-category' as Href);
          }}
        />
        <CategorySummarySection
          categories={categories.slice(0, 3)}
          onPressViewAll={() => {
            router.push('/(budgets)/categories' as Href);
          }}
          onPressCategory={(categoryId) => {
            selectCategory(categoryId);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
