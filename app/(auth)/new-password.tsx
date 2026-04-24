import { LoadingButton } from '@/components/shared/ui/loading-button';
import { useAuthSetup } from '@/context/auth-setup';
import { newPasswordStyles as styles } from '@/stylesheets/new-password-stylesheet';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewPasswordScreen() {
  const router = useRouter();
  const { setComplete } = useAuthSetup();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);

  const onFinish = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    await setComplete(true);
    setBusy(false);
    router.replace('/(tabs)');
  };

  const disabled = password.length < 8 || password !== confirm;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>SETUP 04/04</Text>
            <Text style={styles.title}>Set your vault key</Text>
            <Text style={styles.subtitle}>
              Final step. This password protects access to your TEO finance workspace.
            </Text>
          </View>

          <View style={styles.formWrap}>
            <Text style={styles.label}>New password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#8ea1c0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.hintTitle}>Strong password checklist</Text>
            <View style={styles.ruleRow}>
              <View style={styles.rulePill}>
                <Text style={styles.rulePillText}>8+ chars</Text>
              </View>
              <View style={styles.rulePill}>
                <Text style={styles.rulePillText}>1 symbol</Text>
              </View>
              <View style={styles.rulePill}>
                <Text style={styles.rulePillText}>1 number</Text>
              </View>
            </View>
            <Text style={styles.hint}>Avoid reusing old passwords.</Text>

            <Text style={styles.label}>Confirm password</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter password"
              placeholderTextColor="#8ea1c0"
              secureTextEntry
              value={confirm}
              onChangeText={setConfirm}
            />

            <View style={{ marginTop: 8 }}>
              <LoadingButton
                text="Finish and open TEO"
                onPress={onFinish}
                loading={busy}
                disabled={disabled}
                buttonStyle={{ backgroundColor: '#0051d5', borderRadius: 14 }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
