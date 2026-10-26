import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { PrimaryButton } from '../../components/PrimaryButton';

export const ContactUsScreen = ({ navigation }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Validation Error', 'Please fill in both subject and message.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Message Sent', 'Thank you! Our support team will get back to you soon.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Contact Us" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardInfo}>
          <Ionicons name="call-outline" size={24} color={COLORS.primary} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Customer Support</Text>
            <Text style={styles.cardSub}>+1 (800) 234-5678 (24/7)</Text>
          </View>
        </View>

        <View style={styles.cardInfo}>
          <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Email Support</Text>
            <Text style={styles.cardSub}>support@eventhub.app</Text>
          </View>
        </View>

        <Text style={styles.formHeader}>Send Us a Message</Text>

        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="How can we help you?"
          placeholderTextColor={COLORS.textMuted}
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your question or issue in detail..."
          placeholderTextColor={COLORS.textMuted}
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={5}
        />

        <PrimaryButton
          title="SEND MESSAGE"
          onPress={handleSubmit}
          loading={loading}
          style={styles.sendBtn}
        />
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
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cardText: {
    marginLeft: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  cardSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  formHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8F9FE',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    paddingHorizontal: 14,
    height: 48,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingVertical: 12,
  },
  sendBtn: {
    marginTop: 10,
  },
});
