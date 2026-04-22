export const FIGMA = {
  frameWidth: 390,
  colors: {
    app: '#f7f9fb',
    header: '#f3f5f7',
    surface: '#ffffff',
    surfaceMuted: '#f2f4f6',
    divider: '#e0e3e5',
    primary: '#0047ab',
    primaryDark: '#00327d',
    text: '#191c1e',
    muted: '#64748b',
    faint: '#94a3b8',
    green: '#00593c',
    success: '#4edea3',
    danger: '#ba1a1a',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
    elevation: 2,
  },
} as const;

export type MainTab = 'overview' | 'budgets' | 'insights' | 'settings';

export const MAIN_TABS: {
  key: MainTab;
  label: string;
  route: '/' | '/budgets' | '/insights' | '/settings';
  icon: 'grid-outline' | 'card-outline' | 'analytics-outline' | 'settings-outline';
}[] = [
  { key: 'overview', label: 'OVERVIEW', route: '/', icon: 'grid-outline' },
  { key: 'budgets', label: 'BUDGETS', route: '/budgets', icon: 'card-outline' },
  { key: 'insights', label: 'INSIGHTS', route: '/insights', icon: 'analytics-outline' },
  { key: 'settings', label: 'SETTINGS', route: '/settings', icon: 'settings-outline' },
];
