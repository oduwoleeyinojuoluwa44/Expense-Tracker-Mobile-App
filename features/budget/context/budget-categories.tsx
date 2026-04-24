import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

export type BudgetCategory = {
  id: string;
  name: string;
  budget: number;
  spent: number;
  notes?: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
};

type CreateBudgetCategoryInput = {
  name: string;
  budget: number;
  notes?: string;
};

type BudgetCategoriesContextValue = {
  categories: BudgetCategory[];
  selectedCategoryId: string;
  selectedCategory: BudgetCategory;
  selectCategory: (categoryId: string) => void;
  addCategory: (input: CreateBudgetCategoryInput) => Promise<BudgetCategory>;
};

const STORAGE_KEY = '@teo/budget_categories';
const SECURE_STORAGE_KEY = 'teo_budget_categories';

const DEFAULT_CATEGORIES: BudgetCategory[] = [
  { id: 'food', name: 'Food', budget: 500, spent: 340, icon: 'restaurant' },
  { id: 'travel', name: 'Travel', budget: 700, spent: 320, icon: 'flight' },
  { id: 'salary', name: 'Salary', budget: 2500, spent: 0, icon: 'payments' },
  { id: 'shop', name: 'Shop', budget: 350, spent: 210, icon: 'shopping-bag' },
  { id: 'home', name: 'Home', budget: 900, spent: 540, icon: 'home' },
  { id: 'utilities', name: 'Utilities', budget: 150, spent: 50, icon: 'bolt' },
  { id: 'health-fitness', name: 'Health & Fitness', budget: 120, spent: 90, icon: 'favorite' },
  { id: 'clothing', name: 'Clothing', budget: 180, spent: 120, icon: 'checkroom' },
];

const BudgetCategoriesContext = createContext<BudgetCategoriesContextValue | null>(null);

export function BudgetCategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<BudgetCategory[]>(DEFAULT_CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_CATEGORIES[0].id);

  useEffect(() => {
    let mounted = true;

    async function hydrateCategories() {
      const stored = await readStoredCategories();
      if (!mounted || !stored.length) return;
      setCategories(stored);
      setSelectedCategoryId(stored[0].id);
    }

    void hydrateCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const persistCategories = useCallback(async (nextCategories: BudgetCategory[]) => {
    await writeStoredCategories(nextCategories);
  }, []);

  const selectCategory = useCallback(
    (categoryId: string) => {
      const exists = categories.some((category) => category.id === categoryId);
      if (exists) {
        setSelectedCategoryId(categoryId);
      }
    },
    [categories],
  );

  const addCategory = useCallback(
    async (input: CreateBudgetCategoryInput) => {
      const nextCategory: BudgetCategory = {
        id: createCategoryId(input.name),
        name: input.name.trim(),
        budget: input.budget,
        spent: 0,
        notes: input.notes?.trim() || undefined,
        icon: pickIcon(input.name),
      };

      const nextCategories = [nextCategory, ...categories];
      setCategories(nextCategories);
      setSelectedCategoryId(nextCategory.id);
      await persistCategories(nextCategories);
      return nextCategory;
    },
    [categories, persistCategories],
  );

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) ?? categories[0] ?? DEFAULT_CATEGORIES[0];

  const value = useMemo(
    () => ({
      categories,
      selectedCategoryId,
      selectedCategory,
      selectCategory,
      addCategory,
    }),
    [addCategory, categories, selectCategory, selectedCategory, selectedCategoryId],
  );

  return <BudgetCategoriesContext.Provider value={value}>{children}</BudgetCategoriesContext.Provider>;
}

export function useBudgetCategories() {
  const value = useContext(BudgetCategoriesContext);
  if (!value) {
    throw new Error('useBudgetCategories must be used inside BudgetCategoriesProvider');
  }
  return value;
}

async function readStoredCategories() {
  try {
    const raw = Platform.OS === 'web' ? localStorage.getItem(STORAGE_KEY) : await SecureStore.getItemAsync(SECURE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BudgetCategory[];
    return Array.isArray(parsed) ? parsed.filter(isBudgetCategory) : [];
  } catch (error) {
    console.error('Failed to load budget categories', error);
    return [];
  }
}

async function writeStoredCategories(categories: BudgetCategory[]) {
  try {
    const raw = JSON.stringify(categories);
    if (Platform.OS === 'web') {
      localStorage.setItem(STORAGE_KEY, raw);
      return;
    }
    await SecureStore.setItemAsync(SECURE_STORAGE_KEY, raw);
  } catch (error) {
    console.error('Failed to save budget categories', error);
  }
}

function isBudgetCategory(value: BudgetCategory): value is BudgetCategory {
  return Boolean(value?.id && value?.name && typeof value.budget === 'number' && typeof value.spent === 'number' && value.icon);
}

function createCategoryId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug || 'category'}-${Date.now()}`;
}

function pickIcon(name: string): BudgetCategory['icon'] {
  const normalized = name.toLowerCase();
  if (normalized.includes('food') || normalized.includes('meal')) return 'restaurant';
  if (normalized.includes('travel') || normalized.includes('trip')) return 'flight';
  if (normalized.includes('health') || normalized.includes('gym')) return 'favorite';
  if (normalized.includes('cloth') || normalized.includes('fashion')) return 'checkroom';
  if (normalized.includes('home') || normalized.includes('rent')) return 'home';
  return 'category';
}
