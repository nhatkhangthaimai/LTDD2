import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ShareModal } from '../../components/ShareModal';
import { LoadingView } from '../../components/LoadingView';
import { eventService } from '../../services/eventService';
import { userService } from '../../services/userService';
import { EventContext } from '../../context/EventContext';

export const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId = 'evt1' } = route.params || {};
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareVisible, setShareVisible] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const { isBookmarked, toggleBookmark, isOrganizerFollowed, toggleFollowOrganizer } = useContext(EventContext);

  useEffect(() => {
    loadEventData();
  }, [eventId]);

  const loadEventData = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEventById(eventId);
      setEvent(data);
      const org = await userService.getOrganizerById(data.organizerId || 'org1');
      setOrganizer(org);
    } catch (e) {
      Alert.alert('Error', 'Failed to load event details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !event) {
    return <LoadingView message="Loading Event Details..." />;
  }

  const bookmarked = isBookmarked(event.id);
  const followed = organizer ? isOrganizerFollowed(organizer.id) : false;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: event.image }} style={styles.bannerImage} resizeMode="cover" />

          {/* Top Overlays */}
          <SafeAreaView style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.circleIconBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.white} />
            </TouchableOpacity>

            <Text style={styles.headerTitleText}>Event Details</Text>

            <TouchableOpacity
              style={[styles.circleIconBtn, bookmarked && styles.activeBookmarkCircle]}
              onPress={() => toggleBookmark(event.id)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Attendees Floating Pill Overlay */}
          <View style={styles.attendeesFloatingCard}>
            <View style={styles.avatarStackRow}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }}
                style={[styles.avatarStack, { zIndex: 3 }]}
              />
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }}
                style={[styles.avatarStack, { left: 14, zIndex: 2 }]}
              />
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }}
                style={[styles.avatarStack, { left: 28, zIndex: 1 }]}
              />
            </View>
            <Text style={styles.attendeesText}>+{event.attendees || 20} Going</Text>

            <TouchableOpacity
              style={styles.invitePillBtn}
              onPress={() => navigation.navigate('InviteFriend', { eventTitle: event.title })}
            >
              <Text style={styles.invitePillText}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Body */}
        <View style={styles.infoBody}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          {/* Date & Time Row */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconCircle}>
              <Ionicons name="calendar-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>{event.date}</Text>
              <Text style={styles.detailSub}>{event.startTime} - {event.endTime}</Text>
            </View>
          </View>

          {/* Location Row */}
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => navigation.navigate('MapView', { targetEvent: event })}
            activeOpacity={0.8}
          >
            <View style={styles.detailIconCircle}>
              <Ionicons name="location-sharp" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>{event.location}</Text>
              <Text style={styles.detailSub}>{event.address}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Organizer Row */}
          {organizer && (
            <TouchableOpacity
              style={styles.organizerRow}
              onPress={() => navigation.navigate('OrganizerProfile', { organizerId: organizer.id })}
              activeOpacity={0.8}
            >
              <Image source={{ uri: organizer.avatar }} style={styles.organizerAvatar} />
              <View style={styles.organizerInfo}>
                <Text style={styles.organizerName}>{organizer.name}</Text>
                <Text style={styles.organizerRole}>Organizer</Text>
              </View>

              <TouchableOpacity
                style={[styles.followBtn, followed && styles.followedBtn]}
                onPress={() => toggleFollowOrganizer(organizer.id)}
              >
                <Text style={[styles.followBtnText, followed && styles.followedBtnText]}>
                  {followed ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}

          {/* Share Action Button */}
          <TouchableOpacity style={styles.shareRowBtn} onPress={() => setShareVisible(true)}>
            <Ionicons name="share-social-outline" size={20} color={COLORS.primary} />
            <Text style={styles.shareRowText}>Share with Friends</Text>
          </TouchableOpacity>

          {/* About Event Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About Event</Text>
            <Text style={styles.aboutDescription} numberOfLines={readMore ? undefined : 3}>
              {event.description}
            </Text>
            <TouchableOpacity onPress={() => setReadMore(!readMore)}>
              <Text style={styles.readMoreText}>{readMore ? 'Show Less' : 'Read More...'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          title={`BUY TICKET $${event.price}`}
          onPress={() => navigation.navigate('TicketBooking', { event })}
          style={styles.buyBtn}
        />
      </View>

      <ShareModal
        visible={shareVisible}
        onClose={() => setShareVisible(false)}
        eventTitle={event.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bannerContainer: {
    width: '100%',
    height: 260,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBookmarkCircle: {
    backgroundColor: COLORS.badgeText,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  attendeesFloatingCard: {
    position: 'absolute',
    bottom: -24,
    alignSelf: 'center',
    width: '85%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarStackRow: {
    width: 50,
    height: 24,
    position: 'relative',
  },
  avatarStack: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  attendeesText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 12,
  },
  invitePillBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  invitePillText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  infoBody: {
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  eventTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 34,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  detailIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  detailSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  organizerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  organizerRole: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  followedBtn: {
    backgroundColor: '#F0F1F5',
  },
  followBtnText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  followedBtnText: {
    color: COLORS.textSecondary,
  },
  shareRowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FC',
    padding: 12,
    borderRadius: 14,
    marginVertical: 10,
    justifyContent: 'center',
  },
  shareRowText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
  aboutSection: {
    marginTop: 16,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F1F5',
  },
  buyBtn: {
    width: '100%',
  },
});
