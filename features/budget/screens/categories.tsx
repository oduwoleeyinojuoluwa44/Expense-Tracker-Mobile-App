import { CategoryPickerCard } from '@/features/budget/components/category-picker-card';
import { HomeTopHeader } from '@/features/home/components/home-top-header';
import { NewAllocationCard } from '@/features/home/components/new-allocation-card';
import { budgetStyles as styles } from '@/features/budget/styles/budget';
import { useRouter, type Href } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetCategoriesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <HomeTopHeader title="Categories" />
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <CategoryPickerCard
            onSelectCategory={(categoryId) => {
              if (categoryId === 'new') {
                router.push('/(budgets)/new-category' as Href);
                return;
              }
              Alert.alert('Category selected', `Active category: ${categoryId}`);
            }}
            onPressAddCategory={() => {
              router.push('/(budgets)/new-category' as Href);
            }}
          />

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
