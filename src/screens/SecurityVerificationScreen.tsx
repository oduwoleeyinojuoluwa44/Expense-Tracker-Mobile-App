import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenShell } from '@/components/figma/ScreenShell';
import { FIGMA } from '@/constants/figma';

export default function SecurityVerificationScreen() {
  const router = useRouter();

  return (
    <ScreenShell nav={false} topPadding={96} bottomPadding={32}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>SECURITY VERIFICATION</Text>
        <Text style={styles.title}>Biometric Liveness{'\n'}Verification</Text>
        <Text style={styles.body}>
          Please position your face within the frame. We need to verify that your babe is not
          holding you ransom
        </Text>
      </View>

      <View style={styles.cameraFrame}>
        <View style={styles.cornerTl} />
        <View style={styles.cornerTr} />
        <View style={styles.cornerBl} />
        <View style={styles.cornerBr} />
        <Text style={styles.cameraText}>Please blink twice{'\n'}If you are safe</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verification Steps</Text>
        {[
          ['Position Face', 'Align your head within the square\nand stay still.'],
          ['Follow Prompts', 'Blink or smile when requested to\nverify liveness.'],
          ['System Check', 'Encryption and validity cross-\nreference.'],
        ].map(([title, copy], index) => (
          <View key={title} style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View>
              <Text style={styles.stepTitle}>{title}</Text>
              <Text style={styles.stepCopy}>{copy}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for Success</Text>
        <Text style={styles.tip}>Ensure your face is well-lit from the front.</Text>
        <Text style={styles.tip}>Remove glasses or hats if verification fails.</Text>
        <Text style={styles.tip}>Maintain a neutral background.</Text>
      </View>

      <View style={styles.statuses}>
        <Text style={styles.ok}>Lighting conditions optimal</Text>
        <Text style={styles.warn}>Face partially obscured</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.cancel} onPress={() => router.push('/settings')}>
          <Text style={styles.cancelText}>Cancel Verification</Text>
        </Pressable>
        <Pressable style={styles.trouble}>
          <Text style={styles.troubleText}>Troubleshoot Camera</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>PROTECTED BY SOVEREIGN LEDGER ENCRYPTION V4.2</Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 12,
  },
  eyebrow: {
    color: FIGMA.colors.primaryDark,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: FIGMA.colors.text,
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
  },
  body: {
    color: FIGMA.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  cameraFrame: {
    height: 342,
    borderRadius: 24,
    backgroundColor: FIGMA.colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cameraText: {
    color: FIGMA.colors.primaryDark,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  cornerTl: {
    position: 'absolute',
    top: 22,
    left: 22,
    width: 52,
    height: 52,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: FIGMA.colors.primaryDark,
  },
  cornerTr: {
    position: 'absolute',
    top: 22,
    right: 22,
    width: 52,
    height: 52,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: FIGMA.colors.primaryDark,
  },
  cornerBl: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    width: 52,
    height: 52,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: FIGMA.colors.primaryDark,
  },
  cornerBr: {
    position: 'absolute',
    bottom: 22,
    right: 22,
    width: 52,
    height: 52,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: FIGMA.colors.primaryDark,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    color: FIGMA.colors.text,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  step: {
    flexDirection: 'row',
    gap: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: FIGMA.colors.surface,
    ...FIGMA.shadow,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FIGMA.colors.primaryDark,
  },
  stepNumberText: {
    color: FIGMA.colors.surface,
    fontWeight: '800',
  },
  stepTitle: {
    color: FIGMA.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  stepCopy: {
    color: FIGMA.colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  tip: {
    color: FIGMA.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  statuses: {
    gap: 10,
  },
  ok: {
    color: FIGMA.colors.green,
    fontWeight: '700',
  },
  warn: {
    color: FIGMA.colors.danger,
    fontWeight: '700',
  },
  actions: {
    gap: 12,
  },
  cancel: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FIGMA.colors.surfaceMuted,
  },
  trouble: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FIGMA.colors.primaryDark,
  },
  cancelText: {
    color: FIGMA.colors.danger,
    fontSize: 15,
    fontWeight: '700',
  },
  troubleText: {
    color: FIGMA.colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    color: FIGMA.colors.faint,
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
});
