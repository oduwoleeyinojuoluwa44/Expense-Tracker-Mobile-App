import type { Href } from 'expo-router';
import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type BudgetNavItem = {
  key: 'overview' | 'expenses' | 'budgets' | 'settings';
  label: string;
  route: Href;
  icon: IconName;
};

export type BudgetCategory = {
  title: string;
  spent: string;
  limit: string;
  badge?: string;
  used: string;
  left: string;
  progress: number;
  icon: IconName;
  iconColor: string;
  iconBackground: string;
  badgeBackground?: string;
  badgeColor?: string;
  leftColor: string;
  fill: 'danger' | 'greenGradient' | 'primary';
  transportOrder?: boolean;
};

export const budgetNavItems: BudgetNavItem[] = [
  { key: 'overview', label: 'OVERVIEW', route: '/', icon: 'grid-outline' },
  { key: 'expenses', label: 'EXPENSES', route: '/ledgers', icon: 'receipt-outline' },
  { key: 'budgets', label: 'BUDGETS', route: '/budgets', icon: 'card-outline' },
  { key: 'settings', label: 'SETTINGS', route: '/settings', icon: 'settings-outline' },
];

export const budgetCategories: BudgetCategory[] = [
  {
    title: 'Housing',
    spent: '$2,450',
    limit: '/ $2,500',
    badge: 'AT LIMIT',
    used: 'USED 98%',
    left: '-$50 LEFT',
    progress: 98,
    icon: 'home-outline',
    iconColor: '#00327d',
    iconBackground: 'rgba(0,50,125,0.05)',
    badgeBackground: '#ffdad6',
    badgeColor: '#93000a',
    leftColor: '#ba1a1a',
    fill: 'danger',
  },
  {
    title: 'Dining Out',
    spent: '$420',
    limit: '/ $850',
    badge: 'HEALTHY',
    used: 'USED 49%',
    left: '+$430 LEFT',
    progress: 49,
    icon: 'restaurant-outline',
    iconColor: '#4edea3',
    iconBackground: 'rgba(0,63,41,0.05)',
    badgeBackground: '#00593c',
    badgeColor: '#44d69b',
    leftColor: '#4edea3',
    fill: 'greenGradient',
  },
  {
    title: 'Groceries',
    spent: '$680',
    limit: '/ $1,200',
    badge: 'ON TRACK',
    used: 'USED 56%',
    left: '+$520 LEFT',
    progress: 56,
    icon: 'basket-outline',
    iconColor: '#586377',
    iconBackground: 'rgba(84,95,115,0.05)',
    badgeBackground: '#eceef0',
    badgeColor: '#434653',
    leftColor: '#586377',
    fill: 'primary',
  },
  {
    title: 'Transport',
    spent: '$215',
    limit: '/ $400',
    used: 'USED 53%',
    left: '+$185 LEFT',
    progress: 53,
    icon: 'bus-outline',
    iconColor: '#00327d',
    iconBackground: 'rgba(0,50,125,0.05)',
    leftColor: '#434653',
    fill: 'primary',
    transportOrder: true,
  },
];
