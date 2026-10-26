import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';

const FAQS = [
  {
    question: 'How do I book tickets for an event?',
    answer: 'Browse to any event details page, tap on the "BUY TICKET" button at the bottom, select your seat tier & quantity, and confirm your booking.',
  },
  {
    question: 'Where can I find my booked tickets?',
    answer: 'You can access all your active ticket passes from the side Menu Drawer -> My Tickets, or directly after completing a booking.',
  },
  {
    question: 'Can I bookmark events for later?',
    answer: 'Yes! Tap the bookmark icon on any event card or details banner. You can view all saved events under Menu Drawer -> Bookmark.',
  },
  {
    question: 'How do I follow event organizers?',
    answer: 'Visit any organizer profile page and tap the "Follow" button to receive updates whenever they post new events.',
  },
  {
    question: 'Is real payment required in this demo?',
    answer: 'No, EventHub is running in local demonstration mode. All ticket purchases and account details are stored locally via AsyncStorage without real charges.',
  },
];

export const HelpFaqScreen = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Help & FAQs" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.introText}>
          Find answers to frequently asked questions about EventHub below.
        </Text>

        {FAQS.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={styles.faqCard}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.8}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.questionText}>{faq.question}</Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={COLORS.primary}
                />
              </View>

              {isExpanded && <Text style={styles.answerText}>{faq.answer}</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  introText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  faqCard: {
    backgroundColor: '#F8F9FE',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4DFDF',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 10,
  },
  answerText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 10,
    lineHeight: 20,
    borderTopWidth: 1,
    borderTopColor: '#E4DFDF',
    paddingTop: 10,
  },
});
