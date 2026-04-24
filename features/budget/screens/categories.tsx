import { CategoryPickerCard } from '@/features/budget/components/category-picker-card';
import { CategorySummarySection } from '@/features/budget/components/category-summary-section';
import { useBudgetCategories } from '@/features/budget/context/budget-categories';
import { HomeTopHeader } from '@/features/home/components/home-top-header';
import { NewAllocationCard } from '@/features/home/components/new-allocation-card';
import { budgetStyles as styles } from '@/features/budget/styles/budget';
import { useRouter, type Href } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetCategoriesScreen() {
  const router = useRouter();
  const { categories, selectedCategoryId, selectCategory } = useBudgetCategories();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <HomeTopHeader title="Categories" />
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <CategoryPickerCard
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={selectCategory}
            onPressAddCategory={() => {
              router.push('/(budgets)/new-category' as Href);
            }}
          />

          <CategorySummarySection categories={categories} onPressCategory={selectCategory} />

          <NewAllocationCard
            title="New Category"
            subtitle="Record a new Category"
            buttonLabel="Add Category"
            iconName="add"
            onPressQuickAdd={() => {
              router.push('/(budgets)/new-category' as Href);
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
