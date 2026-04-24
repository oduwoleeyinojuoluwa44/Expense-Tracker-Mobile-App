import { LoadingButton } from '@/components/shared/ui/loading-button';
import { verifyEmailStyles as styles } from '@/features/auth/styles/verify-email';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);

  const onContinue = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    setBusy(false);
    router.push('/(auth)/identity-verification');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>SETUP 02/04</Text>
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.subtitle}>
              Enter the six-digit code sent to your inbox to keep your TEO profile protected.
            </Text>
          </View>

          <View style={styles.formWrap}>
            <Text style={styles.label}>Verification code</Text>
            <TextInput
              style={styles.codeInput}
              placeholder="000000"
              placeholderTextColor="#8ea1c0"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={setCode}
            />
            <Text style={styles.helperText}>Code expires in 10 minutes.</Text>

            <LoadingButton
              text="Verify and continue"
              onPress={onContinue}
              loading={busy}
              disabled={code.trim().length < 6}
              buttonStyle={{ backgroundColor: '#0051d5', borderRadius: 14 }}
            />

            <Pressable style={styles.resendButton}>
              <Text style={styles.resend}>Resend code</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
