import { useBudgetCategories } from '@/features/budget/context/budget-categories';
import { HomeTopHeader } from '@/features/home/components/home-top-header';
import { TransactionKeypad } from '@/features/home/components/transaction-keypad';
import { newCategoryStyles as styles } from '@/features/budget/styles/new-category';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function normalizeAmount(value: string) {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length <= 1) return cleaned;
  return `${parts[0]}.${parts.slice(1).join('')}`;
}

export default function NewCategoryScreen() {
  const router = useRouter();
  const { addCategory } = useBudgetCategories();
  const [categoryName, setCategoryName] = useState('');
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const canSave = categoryName.trim().length > 0 && Number(amount) > 0 && !saving;

  const onSaveCategory = async () => {
    if (!canSave) {
      setError('Add a category name and budget amount.');
      return;
    }

    setSaving(true);
    setError('');
    await addCategory({
      name: categoryName,
      notes,
      budget: Number(amount),
    });
    setSaving(false);
    router.replace('/(budgets)/categories');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}>
        <HomeTopHeader title="New Category" />
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.label}>Category Name</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons name="category" size={14} color="#74777F" />
              <TextInput
                value={categoryName}
                onChangeText={setCategoryName}
                placeholder="Food, rent, travel..."
                placeholderTextColor="#C4C6CF"
                style={styles.input}
              />
            </View>
            <View style={styles.notesCard}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="What was this for?"
                placeholderTextColor="#6B7280"
                multiline
                style={styles.notesInput}
              />
            </View>
          </View>

          <View style={styles.amountCard}>
            <View style={styles.amountTag}>
              <Text style={styles.amountTagText}>USD</Text>
            </View>
            <Text style={styles.label}>Category Budget</Text>
            <Pressable
              onPress={() => {
                setShowKeypad(true);
              }}
            >
              <View style={styles.amountRow}>
                <Text style={styles.amountCurrency}>$</Text>
                <Text style={styles.amountValue}>{amount || '0.00'}</Text>
              </View>
            </Pressable>
            {showKeypad ? (
              <TransactionKeypad
                onPressKey={(key) => {
                  if (key === '⌫') {
                    setAmount((prev) => prev.slice(0, -1));
                    return;
                  }
                  setAmount((prev) => normalizeAmount(`${prev}${key}`));
                }}
              />
            ) : null}
            <Pressable style={styles.continueButton} onPress={() => setShowKeypad(true)}>
              <Text style={styles.continueText}>Continue</Text>
            </Pressable>
            {error ? <Text style={styles.continueText}>{error}</Text> : null}
          </View>
        </ScrollView>

        <View style={styles.actionBar}>
          <Pressable
            style={styles.primaryButton}
            onPress={onSaveCategory}
            disabled={saving}
          >
            <Text style={styles.primaryButtonText}>{saving ? 'Saving...' : 'Save Up!'}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
