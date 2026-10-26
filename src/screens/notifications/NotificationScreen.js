import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { EventContext } from '../../context/EventContext';
import { EmptyNotificationScreen } from './EmptyNotificationScreen';

export const NotificationScreen = ({ navigation }) => {
  const { notifications, markNotificationsAsRead, respondInvite } = useContext(EventContext);

  if (!notifications || notifications.length === 0) {
    return <EmptyNotificationScreen navigation={navigation} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Notification"
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon={
          <TouchableOpacity onPress={markNotificationsAsRead}>
            <Ionicons name="checkmark-done-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.notifCard, !item.read && styles.unreadNotifCard]}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.contentBox}>
              <View style={styles.headerRow}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <Text style={styles.titleText}>{item.title}</Text>

              {/* Action Buttons for Invite Notifications */}
              {item.type === 'invite' && item.status === 'pending' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => respondInvite(item.id, 'reject')}
                  >
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => respondInvite(item.id, 'accept')}
                  >
                    <Text style={styles.acceptText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.type === 'invite' && item.status === 'accepted' && (
                <View style={styles.badgeAccepted}>
                  <Text style={styles.badgeText}>Invitation Accepted</Text>
                </View>
              )}

              {item.type === 'invite' && item.status === 'rejected' && (
                <View style={styles.badgeRejected}>
                  <Text style={styles.badgeText}>Invitation Declined</Text>
                </View>
              )}
            </View>
          </View>
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
    paddingBottom: 30,
  },
  notifCard: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F5',
  },
  unreadNotifCard: {
    backgroundColor: '#F8F9FE',
    borderRadius: 14,
    paddingHorizontal: 10,
    marginVertical: 4,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 14,
  },
  contentBox: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  titleText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  rejectBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    marginRight: 10,
  },
  rejectText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  acceptBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  acceptText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  badgeAccepted: {
    marginTop: 8,
    backgroundColor: '#E8F9F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeRejected: {
    marginTop: 8,
    backgroundColor: '#FCEAEF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
