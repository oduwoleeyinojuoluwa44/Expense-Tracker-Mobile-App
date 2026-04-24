import { useAuthSetup } from '@/context/auth-setup';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function useAuthGuard() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { isHydrated, isComplete } = useAuthSetup();

  useEffect(() => {
    if (!navigationState?.key || !isHydrated) {
      return;
    }

    const group = segments[0] as string | undefined;

    if (!isComplete && (group === '(tabs)' || group === '(home)' || group === '(budgets)')) {
      router.replace('/(auth)/onboarding');
      return;
    }

    if (isComplete && group === '(auth)') {
      router.replace('/(tabs)');
    }
  }, [navigationState?.key, isHydrated, isComplete, router, segments]);
}
