import { onboardingStyles as styles } from '@/features/auth/styles/onboarding';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.hero}>
            <View style={styles.glowTop} pointerEvents="none" />
            <View style={styles.glowBottom} pointerEvents="none" />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>TEO FINANCE OS</Text>
            </View>
            <Text style={styles.title}>Master Money{'\n'}Without Noise</Text>
            <Text style={styles.subtitle}>
              TEO turns spending, budgets, and savings decisions into one sharp daily flow.
            </Text>

            <View style={styles.statRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>4x</Text>
                <Text style={styles.statLabel}>faster budgeting</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>Live</Text>
                <Text style={styles.statLabel}>insight feed</Text>
              </View>
            </View>
          </View>

          <View style={styles.featuresWrap}>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Dynamic Budget Engine</Text>
              <Text style={styles.featureBody}>
                Auto-adjust category targets and surface high-risk spending before month-end.
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Signal-First Dashboard</Text>
              <Text style={styles.featureBody}>
                Spend less time scrolling. See trend, velocity, and allocation in one glance.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.ctaBlock}>
          <Pressable style={styles.primaryCta} onPress={() => router.push('/(auth)/create-account')}>
            <Text style={styles.primaryCtaText}>Start with TEO</Text>
          </Pressable>
          <Pressable style={styles.secondaryCta} onPress={() => router.push('/(auth)/verify-email')}>
            <Text style={styles.secondaryCtaText}>I already have a code</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
