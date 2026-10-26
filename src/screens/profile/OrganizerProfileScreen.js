import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { EventCard } from '../../components/EventCard';
import { EmptyState } from '../../components/EmptyState';
import { LoadingView } from '../../components/LoadingView';
import { userService } from '../../services/userService';
import { eventService } from '../../services/eventService';
import { reviewService } from '../../services/reviewService';
import { EventContext } from '../../context/EventContext';
import { AuthContext } from '../../context/AuthContext';

export const OrganizerProfileScreen = ({ route, navigation }) => {
  const { organizerId = 'org1' } = route.params || {};
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'event' | 'reviews'
  const [organizer, setOrganizer] = useState(null);
  const [orgEvents, setOrgEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [loading, setLoading] = useState(true);

  const { isOrganizerFollowed, toggleFollowOrganizer } = useContext(EventContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadOrganizerData();
  }, [organizerId]);

  const loadOrganizerData = async () => {
    try {
      setLoading(true);
      const org = await userService.getOrganizerById(organizerId);
      setOrganizer(org);

      const events = await eventService.getEvents();
      const filteredEvents = events.filter(e => e.organizerId === organizerId);
      setOrgEvents(filteredEvents);

      const revs = await reviewService.getOrganizerReviews(organizerId);
      setReviews(revs);
    } catch (e) {
      console.error('Error loading organizer:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    if (!newReviewText.trim()) {
      Alert.alert('Validation Error', 'Please enter your review text.');
      return;
    }
    try {
      const added = await reviewService.addReview(
        organizerId,
        newRating,
        newReviewText,
        user?.fullName || 'Ashfak Sayem',
        user?.avatar
      );
      setReviews(prev => [added, ...prev]);
      setNewReviewText('');
      Alert.alert('Success', 'Thank you for your review!');
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to add review.');
    }
  };

  if (loading || !organizer) {
    return <LoadingView message="Loading Organizer Profile..." />;
  }

  const followed = isOrganizerFollowed(organizer.id);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon={
          <TouchableOpacity onPress={() => Alert.alert('Options', 'More options menu')}>
            <Ionicons name="ellipsis-vertical" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Profile Info */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: organizer.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{organizer.name}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{organizer.following || 350}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{organizer.followers || 346}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.followBtn, followed && styles.followedBtn]}
              onPress={() => toggleFollowOrganizer(organizer.id)}
            >
              <Ionicons
                name={followed ? 'checkmark' : 'person-add-outline'}
                size={18}
                color={followed ? COLORS.textSecondary : COLORS.white}
              />
              <Text style={[styles.followText, followed && styles.followedText]}>
                {followed ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.messageBtn}
              onPress={() =>
                navigation.navigate('ChatDetail', {
                  userName: organizer.name,
                  avatar: organizer.avatar,
                })
              }
            >
              <Ionicons name="chatbubble-ellipses-outline" size={18} color={COLORS.primary} />
              <Text style={styles.messageText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabsRow}>
          {['about', 'event', 'reviews'].map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabItem, isSelected && styles.tabItemSelected]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabTitle, isSelected && styles.tabTitleSelected]}>
                  {tab.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <View style={styles.tabContent}>
            <Text style={styles.aboutText}>{organizer.about}</Text>
            
            <Text style={styles.sectionLabel}>Interests</Text>
            <View style={styles.tagsContainer}>
              {(organizer.interests || ['Concert', 'Music', 'Live Performance']).map((item, idx) => (
                <View key={idx} style={styles.tagPill}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'event' && (
          <View style={styles.tabContent}>
            {orgEvents.length === 0 ? (
              <EmptyState
                icon="calendar-outline"
                title="No Events Hosted"
                description="This organizer has no active upcoming events currently."
              />
            ) : (
              orgEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  layout="vertical"
                  onPress={() => navigation.navigate('EventDetails', { eventId: evt.id })}
                />
              ))
            )}
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.tabContent}>
            {/* Add Review Box */}
            <View style={styles.addReviewBox}>
              <Text style={styles.addReviewTitle}>Write a Review</Text>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setNewRating(star)}>
                    <Ionicons
                      name={star <= newRating ? 'star' : 'star-outline'}
                      size={24}
                      color="#FFC107"
                      style={styles.starIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.reviewInput}
                placeholder="Share your experience with this organizer..."
                placeholderTextColor={COLORS.textMuted}
                value={newReviewText}
                onChangeText={setNewReviewText}
                multiline
              />
              <TouchableOpacity style={styles.postReviewBtn} onPress={handleAddReview}>
                <Text style={styles.postReviewText}>POST REVIEW</Text>
              </TouchableOpacity>
            </View>

            {/* Reviews List */}
            {reviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <Image source={{ uri: rev.userAvatar }} style={styles.revAvatar} />
                <View style={styles.revContent}>
                  <View style={styles.revHeader}>
                    <Text style={styles.revName}>{rev.userName}</Text>
                    <Text style={styles.revDate}>{rev.date}</Text>
                  </View>

                  <View style={styles.starRowSmall}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Ionicons
                        key={s}
                        name={s <= rev.rating ? 'star' : 'star-outline'}
                        size={14}
                        color="#FFC107"
                      />
                    ))}
                  </View>

                  <Text style={styles.revComment}>{rev.comment}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
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
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#EAEAEA',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 48,
    borderRadius: 14,
    marginRight: 10,
  },
  followedBtn: {
    backgroundColor: '#F0F1F5',
  },
  followText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  followedText: {
    color: COLORS.textSecondary,
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    flex: 1,
    height: 48,
    borderRadius: 14,
  },
  messageText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
  },
  tabItemSelected: {
    borderBottomColor: COLORS.primary,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  tabTitleSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  tabContent: {
    paddingTop: 8,
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPill: {
    backgroundColor: '#F0F1F5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  addReviewBox: {
    backgroundColor: '#F8F9FE',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  addReviewTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starIcon: {
    marginRight: 6,
  },
  reviewInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  postReviewBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  postReviewText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F1F5',
  },
  revAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  revContent: {
    flex: 1,
  },
  revHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  revName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  revDate: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  starRowSmall: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  revComment: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
