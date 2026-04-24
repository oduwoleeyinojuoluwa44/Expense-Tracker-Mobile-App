export const allocations = [
  { title: 'Transport', amount: '$320', left: '$380 LEFT', progress: 45, tone: 'blue' },
  { title: 'Dining Out', amount: '$485', left: '$15 LEFT', progress: 80, tone: 'red' },
  { title: 'Groceries', amount: '$250', left: '$50 LEFT', progress: 45, tone: 'blue' },
  { title: 'Utilities', amount: '$150', left: '$100 LEFT', progress: 80, tone: 'red' },
  { title: 'Entertainment', amount: '$200', left: '$100 LEFT', progress: 45, tone: 'blue' },
  { title: 'Transportation', amount: '$100', left: '$200 LEFT', progress: 80, tone: 'red' },
];

export const ledgerRows = [
  ['Apple Store', 'TECHNOLOGY • 2:45 PM', '-$1,299.00', 'OCT 12', 'red'],
  ['Dividend Payout', 'INVESTMENT • 11:20 AM', '+$450.25', 'OCT 11', 'green'],
  ['The Gilded Fork', 'DINING • 8:15 PM', '-$240.50', 'OCT 10', 'red'],
  ['Netflix Subscription', 'ENTERTAINMENT • 9:00 AM', '-$15.99', 'OCT 9', 'red'],
  ['Gym Membership', 'HEALTH • 6:30 PM', '-$49.99', 'OCT 8', 'red'],
  ['Office Supplies', 'BUSINESS • 1:00 PM', '-$80.75', 'OCT 7', 'red'],
  ['Freelance Project', 'INCOME • 3:15 PM', '+$1,200.00', 'OCT 6', 'green'],
  ['Electricity Bill', 'UTILITIES • 2:00 PM', '-$120.45', 'OCT 5', 'red'],
  ['Spotify Premium', 'ENTERTAINMENT • 7:00 AM', '-$9.99', 'OCT 4', 'red'],
  ['Market Investment', 'INVESTMENT • 12:30 PM', '+$600.00', 'OCT 3', 'green'],
] as const;

export const settingGroups = [
  {
    title: 'SECURITY & ACCESS',
    rows: [
      ['Biometrics', 'FaceID or TouchID Enabled'],
      ['Security PIN', 'Last updated 12 days ago'],
      ['User Password', 'Last updated 5 days ago'],
      ['Two-Factor Authentication', 'Last updated 1 month ago'],
    ],
  },
  {
    title: 'DATA MANAGEMENT',
    rows: [
      ['Export Data', 'CSV, PDF, or JSON'],
      ['Cloud Backup', 'Auto-sync enabled'],
      ['User Analytics', 'Real-time insights available'],
      ['Custom Reports', 'Schedule and automate generation'],
    ],
  },
  {
    title: 'PREFERENCES',
    rows: [
      ['Currency', 'USD ($)'],
      ['Language', 'English (US)'],
      ['Timezone', 'UTC -5'],
      ['Help Center', 'FAQs and direct support'],
      ['Payment Method', 'Credit Card'],
      ['Shipping Options', 'Standard and Express'],
      ['Loyalty Program', 'Rewards points system'],
    ],
  },
];
