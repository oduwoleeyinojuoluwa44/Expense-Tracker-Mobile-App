import { LoadingButton } from '@/components/shared/ui/loading-button';
import { createAccountStyles as styles } from '@/stylesheets/create-account-stylesheet';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateAccountScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onContinue = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    setBusy(false);
    router.push('/(auth)/verify-email');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>SETUP 01/04</Text>
            <Text style={styles.title}>Create your TEO ID</Text>
            <Text style={styles.subtitle}>
              This secures your workspace and links your budget intelligence across devices.
            </Text>
          </View>

          <View style={styles.formWrap}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@teo.app"
              placeholderTextColor="#8ea1c0"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="At least 8 characters"
              placeholderTextColor="#8ea1c0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.helperText}>Use letters, numbers, and one symbol for better security.</Text>

            <View style={{ marginTop: 8 }}>
              <LoadingButton
                text="Continue to email verify"
                onPress={onContinue}
                loading={busy}
                disabled={!email.trim() || password.length < 8}
                buttonStyle={{ backgroundColor: '#0051d5', borderRadius: 14 }}
              />
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerNote}>Already started setup?</Text>
            <Pressable onPress={() => router.push('/(auth)/verify-email')}>
              <Text style={styles.footerLink}>Verify code</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
