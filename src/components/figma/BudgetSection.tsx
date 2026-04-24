import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { FIGMA } from '@/constants/figma';
import { budgetCategories, budgetNavItems, type BudgetCategory } from '@/data/budget-section';

export function BudgetFigmaFrame() {
  const router = useRouter();

  return (
    <View style={styles.frame}>
      <StatusBar style="dark" />
      <BudgetHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.main}>
        <BudgetHero />
        <BudgetActions onAdd={() => router.push('/add-transaction')} />
        <View style={styles.categoryGrid}>
          {budgetCategories.map((category) => (
            <BudgetCategoryCard key={category.title} category={category} />
          ))}
          <SavingsGoalCard onAllocate={() => router.push('/add-transaction')} />
        </View>
      </ScrollView>
      <BudgetBottomNav />
    </View>
  );
}

function BudgetHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerBrand}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color="#ffffff" />
        </View>
        <Text style={styles.brandText}>Sovereign Ledger</Text>
      </View>
      <Pressable style={({ pressed }) => [styles.bellButton, pressed && styles.pressed]}>
        <Ionicons name="notifications-outline" size={20} color={FIGMA.colors.primaryDark} />
      </Pressable>
    </View>
  );
}

function BudgetHero() {
  return (
    <View style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={styles.eyebrow}>MONTHLY OVERVIEW</Text>
        <Text style={styles.heroTitle}>September Budgets</Text>
        <Text style={styles.heroBody}>
          {"You've utilized "}
          <Text style={styles.heroBodyStrong}>64%</Text>
          {' of your total monthly\nallowance. Your trajectory suggests you\u2019ll\nremain within limits by month-end.'}
        </Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Spent</Text>
        <Text style={styles.totalValue}>$4,280.00</Text>
        <View style={styles.totalProgressTrack}>
          <LinearGradient
            colors={[FIGMA.colors.primaryDark, FIGMA.colors.primary]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.totalProgressFill}
          />
        </View>
        <Text style={styles.totalSub}>of $6,700.00 total budget</Text>
      </View>
    </View>
  );
}

function BudgetActions({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={styles.actionRow}>
      <View style={styles.actionButtons}>
        <Pressable onPress={onAdd} style={({ pressed }) => [styles.fullWidth, pressed && styles.pressed]}>
          <LinearGradient
            colors={[FIGMA.colors.primaryDark, FIGMA.colors.primary]}
            start={{ x: 0.12, y: 0 }}
            end={{ x: 0.88, y: 1 }}
            style={styles.primaryAction}>
            <Ionicons name="add" size={12} color="#ffffff" />
            <Text style={styles.primaryActionText}>Add New Category</Text>
          </LinearGradient>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}>
          <Ionicons name="create-outline" size={15} color="#586377" />
          <Text style={styles.secondaryActionText}>Edit Budgets</Text>
        </Pressable>
      </View>

      <View style={styles.sortPill}>
        <Ionicons name="filter-outline" size={18} color="#545f73" />
        <Text style={styles.sortText}>Sort by: Usage %</Text>
      </View>
    </View>
  );
}

function BudgetCategoryCard({ category }: { category: BudgetCategory }) {
  return (
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: category.iconBackground }]}>
          <Ionicons name={category.icon} size={20} color={category.iconColor} />
        </View>
        {category.badge ? (
          <View style={[styles.badge, { backgroundColor: category.badgeBackground }]}>
            <Text style={[styles.badgeText, { color: category.badgeColor }]}>{category.badge}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.categoryTitleBlock}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>

      <View style={styles.moneyRow}>
        <Text style={styles.spent}>{category.spent}</Text>
        <Text style={styles.limit}>{category.limit}</Text>
      </View>

      <View style={styles.categoryProgressBlock}>
        {category.transportOrder ? (
          <>
            <ProgressBar category={category} />
            <CategoryMeta category={category} />
          </>
        ) : (
          <>
            <CategoryMeta category={category} />
            <ProgressBar category={category} />
          </>
        )}
      </View>
    </View>
  );
}

function CategoryMeta({ category }: { category: BudgetCategory }) {
  return (
    <View style={styles.categoryMeta}>
      <Text style={styles.usedText}>{category.used}</Text>
      <Text style={[styles.leftText, { color: category.leftColor }]}>{category.left}</Text>
    </View>
  );
}

function ProgressBar({ category }: { category: BudgetCategory }) {
  const fillStyle = [styles.categoryProgressFill, { width: `${category.progress}%` as const }];

  return (
    <View style={styles.categoryProgressTrack}>
      {category.fill === 'greenGradient' ? (
        <LinearGradient
          colors={['#003f29', '#4edea3']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={fillStyle}
        />
      ) : (
        <View
          style={[
            fillStyle,
            { backgroundColor: category.fill === 'danger' ? FIGMA.colors.danger : FIGMA.colors.primary },
          ]}
        />
      )}
    </View>
  );
}

function SavingsGoalCard({ onAllocate }: { onAllocate: () => void }) {
  return (
    <LinearGradient
      colors={[FIGMA.colors.primaryDark, FIGMA.colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.savingsCard}>
      <View style={styles.goalRingWrap}>
        <Svg width={160} height={160} viewBox="0 0 160 160">
          <Circle cx={80} cy={80} r={58} stroke="rgba(255,255,255,0.16)" strokeWidth={6} fill="none" />
          <Circle
            cx={80}
            cy={80}
            r={58}
            stroke="#4edea3"
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 58}`}
            strokeDashoffset={`${2 * Math.PI * 58 * 0.25}`}
            transform="rotate(-90 80 80)"
          />
        </Svg>
        <View style={styles.goalTextWrap}>
          <Text style={styles.goalPercent}>75%</Text>
          <Text style={styles.goalLabel}>GOAL</Text>
        </View>
      </View>

      <View style={styles.savingsCopy}>
        <Text style={styles.savingsTitle}>{'Smart Allocation\nDetected'}</Text>
        <Text style={styles.savingsBody}>
          {'We noticed you\u2019ve spent 40% less on\nTransport this month. Would you like to\nre-allocate $150 towards your\n"Vacation Fund"?'}
        </Text>
        <Pressable onPress={onAllocate} style={({ pressed }) => [styles.allocateButton, pressed && styles.pressed]}>
          <Text style={styles.allocateText}>Allocate Now</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

function BudgetBottomNav() {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      {budgetNavItems.map((item) => {
        const active = item.key === 'budgets';

        return (
          <Pressable
            key={item.key}
            onPress={() => router.push(item.route)}
            style={({ pressed }) => [styles.navLink, active && styles.navLinkActive, pressed && styles.pressed]}>
            <Ionicons name={item.icon} size={item.key === 'settings' ? 20 : 18} color={active ? '#00327d' : '#5c6063'} />
            <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  header: {
    height: 72,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#f7f9fb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#191c1e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
    elevation: 2,
    zIndex: 2,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: FIGMA.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  brandText: {
    color: FIGMA.colors.primaryDark,
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -1,
  },
  bellButton: {
    width: 32,
    height: 36,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 177,
    rowGap: 40,
  },
  hero: {
    gap: 20,
  },
  heroCopy: {
    gap: 16,
  },
  eyebrow: {
    color: '#545f73',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: FIGMA.colors.text,
    fontFamily: 'Manrope_700Bold',
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.9,
  },
  heroBody: {
    color: '#434653',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 26,
  },
  heroBodyStrong: {
    color: FIGMA.colors.primaryDark,
    fontFamily: 'Inter_700Bold',
  },
  totalCard: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(195,198,213,0.1)',
    borderWidth: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 0,
    padding: 25,
    gap: 8,
    shadowColor: '#191c1e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.02,
    shadowRadius: 40,
    elevation: 1,
  },
  totalLabel: {
    color: '#545f73',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  totalValue: {
    color: FIGMA.colors.primaryDark,
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 30,
    lineHeight: 36,
  },
  totalProgressTrack: {
    height: 6,
    borderRadius: 9999,
    backgroundColor: '#e0e3e5',
    overflow: 'hidden',
  },
  totalProgressFill: {
    width: '64%',
    height: 6,
    borderRadius: 9999,
  },
  totalSub: {
    color: '#434653',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  actionRow: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(195,198,213,0.15)',
    paddingTop: 8,
    paddingBottom: 9,
    gap: 16,
  },
  actionButtons: {
    gap: 18,
  },
  fullWidth: {
    width: '100%',
  },
  primaryAction: {
    minHeight: 40,
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
  },
  primaryActionText: {
    color: '#ffffff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
  secondaryAction: {
    minHeight: 40,
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 31,
    backgroundColor: '#d5e0f8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 19,
  },
  secondaryActionText: {
    color: '#586377',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
  sortPill: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#f2f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sortText: {
    color: '#545f73',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  categoryGrid: {
    gap: 24,
  },
  categoryCard: {
    minHeight: 246.5,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(195,198,213,0.1)',
    borderWidth: 1,
    borderRadius: 32,
    padding: 25,
    gap: 4,
    shadowColor: '#191c1e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.02,
    shadowRadius: 40,
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
  },
  categoryTitleBlock: {
    paddingTop: 20,
  },
  categoryTitle: {
    color: FIGMA.colors.text,
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    lineHeight: 28,
  },
  moneyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  spent: {
    color: FIGMA.colors.text,
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  limit: {
    color: '#434653',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  categoryProgressBlock: {
    paddingTop: 20,
    gap: 8,
  },
  categoryMeta: {
    minHeight: 16.5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  usedText: {
    color: '#434653',
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    lineHeight: 16.5,
    letterSpacing: -0.55,
  },
  leftText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    lineHeight: 16.5,
    letterSpacing: -0.55,
  },
  categoryProgressTrack: {
    height: 12,
    borderRadius: 9999,
    backgroundColor: '#e0e3e5',
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: 12,
    borderRadius: 9999,
  },
  savingsCard: {
    minHeight: 483,
    borderRadius: 32,
    padding: 32,
    gap: 24,
  },
  goalRingWrap: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTextWrap: {
    position: 'absolute',
    left: 53,
    top: 56,
    alignItems: 'center',
  },
  goalPercent: {
    color: '#ffffff',
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  goalLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
  },
  savingsCopy: {
    gap: 15,
  },
  savingsTitle: {
    color: '#ffffff',
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  savingsBody: {
    color: '#a5bdff',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22.75,
  },
  allocateButton: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 10.9,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allocateText: {
    color: FIGMA.colors.primaryDark,
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    lineHeight: 20,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 98,
    paddingTop: 13,
    paddingBottom: 32,
    paddingLeft: 25.22,
    paddingRight: 25.28,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,50,125,0.05)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#191c1e',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
    elevation: 8,
  },
  navLink: {
    minHeight: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLinkActive: {
    width: 102.91,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,71,171,0.05)',
  },
  navLabel: {
    marginTop: 4,
    color: '#5c6063',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
  },
  navLabelActive: {
    color: FIGMA.colors.primaryDark,
  },
  pressed: {
    opacity: 0.72,
  },
});
