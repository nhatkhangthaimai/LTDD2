import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';

export const ChatDetailScreen = ({ route, navigation }) => {
  const { userName = 'Organizer', avatar } = route.params || {};

  const [messages, setMessages] = useState([
    { id: 'm1', text: `Hi there! Thanks for your interest in our event!`, sender: 'them', time: '10:30 AM' },
    { id: 'm2', text: `Hello ${userName}, will food trucks be available on site?`, sender: 'me', time: '10:32 AM' },
    { id: 'm3', text: 'Yes, absolutely! We have over 10 local artisan food vendors.', sender: 'them', time: '10:33 AM' },
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg = {
      id: 'm_' + Date.now(),
      text: inputText.trim(),
      sender: 'me',
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const textCopy = inputText;
    setInputText('');

    // Simulate auto-reply from organizer after 1 second!
    setTimeout(() => {
      const replyMsg = {
        id: 'm_reply_' + Date.now(),
        text: `Got your message: "${textCopy}". We look forward to seeing you at the event!`,
        sender: 'them',
        time: 'Just now',
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={userName}
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon={
          <Image
            source={{
              uri:
                avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            }}
            style={styles.headerAvatar}
          />
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isMe = item.sender === 'me';
            return (
              <View style={[styles.msgBubble, isMe ? styles.myBubble : styles.theirBubble]}>
                <Text style={[styles.msgText, isMe ? styles.myMsgText : styles.theirMsgText]}>
                  {item.text}
                </Text>
                <Text style={[styles.timeText, isMe ? styles.myTimeText : styles.theirTimeText]}>
                  {item.time}
                </Text>
              </View>
            );
          }}
        />

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            placeholderTextColor={COLORS.textMuted}
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  msgBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F1F5',
    borderBottomLeftRadius: 2,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myMsgText: {
    color: COLORS.white,
  },
  theirMsgText: {
    color: COLORS.textPrimary,
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTimeText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  theirTimeText: {
    color: COLORS.textMuted,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F1F5',
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#F8F9FE',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginRight: 10,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
