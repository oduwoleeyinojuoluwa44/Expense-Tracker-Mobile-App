import { LedgerTierBento } from '@/features/settings/components/ledger-tier-bento';
import { ProfileCard } from '@/features/settings/components/profile-card';
import { SettingsGroupsSection } from '@/features/settings/components/settings-groups-section';
import { useAuthSetup } from '@/context/auth-setup';
import { LedgerHeader } from '@/features/overview/components/ledger-header';
import { settingsStyles as styles } from '@/features/settings/styles/settings';
import { useRouter, type Href } from 'expo-router';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const { setComplete } = useAuthSetup();

  const handleSignOut = () => {
    Alert.alert('Sign out?', 'You will be returned to the auth flow.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await setComplete(false);
          router.replace('/(auth)/create-account');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <ProfileCard
          onPress={() => {
            Alert.alert('Profile', 'Open profile details and membership settings.');
          }}
        />
        <LedgerTierBento
          onPressDefaultLedger={() => {
            Alert.alert('Default ledger', 'Main Savings selected as your default ledger.');
          }}
          onPressUpgrade={() => {
            Alert.alert('Upgrade', 'Open Sovereign Executive plan details.');
          }}
        />
        <SettingsGroupsSection
          onPressUserPassword={() => router.push('/(tabs)/change-password' as Href)}
          onPressCurrency={() => Alert.alert('Currency', 'Open currency selector.')}
          onPressLanguage={() => Alert.alert('Language', 'Open language selector.')}
          onPressHelpCenter={() => Alert.alert('Help Center', 'Opening FAQs and support.')}
          onPressSignOut={handleSignOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
