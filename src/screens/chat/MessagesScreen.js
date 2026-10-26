import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';

const MOCK_CONVERSATIONS = [
  {
    id: 'c1',
    name: 'David Silbia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    lastMessage: 'Hey! Are you coming to Jo Malone Mother\'s Day?',
    time: '10:45 AM',
    unread: 2,
  },
  {
    id: 'c2',
    name: 'International Music Group',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    lastMessage: 'Your VIP pass has been confirmed for the concert.',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 'c3',
    name: 'Alex Lee',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    lastMessage: 'Let\'s catch up at the Street Food Carnival!',
    time: 'Tue',
    unread: 0,
  },
];

export const MessagesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Message" showBack onBackPress={() => navigation.goBack()} />

      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate('ChatDetail', {
                userName: item.name,
                avatar: item.avatar,
              })
            }
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.chatInfo}>
              <View style={styles.topRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.lastMsg} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
                {item.unread > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F5',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  time: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMsg: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginRight: 10,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
});
