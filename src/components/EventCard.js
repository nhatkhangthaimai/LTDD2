import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { EventContext } from '../context/EventContext';

export const EventCard = ({ event, onPress, layout = 'horizontal' }) => {
  const { isBookmarked, toggleBookmark } = useContext(EventContext);
  const bookmarked = isBookmarked(event.id);

  const handleBookmarkPress = (e) => {
    e.stopPropagation && e.stopPropagation();
    toggleBookmark(event.id);
  };

  if (layout === 'horizontal') {
    return (
      <TouchableOpacity style={styles.cardHorizontal} onPress={onPress} activeOpacity={0.9}>
        <View style={styles.imageWrapperHorizontal}>
          <Image source={{ uri: event.image }} style={styles.imageHorizontal} resizeMode="cover" />
          
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeDay}>{event.dateMonth ? event.dateMonth.split(' ')[0] : '10'}</Text>
            <Text style={styles.dateBadgeMonth}>{event.dateMonth ? event.dateMonth.split(' ')[1] : 'JUN'}</Text>
          </View>

          <TouchableOpacity
            style={[styles.bookmarkCircle, bookmarked && styles.bookmarkCircleActive]}
            onPress={handleBookmarkPress}
            activeOpacity={0.8}
          >
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={bookmarked ? COLORS.white : COLORS.badgeText}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentHorizontal}>
          <Text style={styles.titleHorizontal} numberOfLines={1}>
            {event.title}
          </Text>

          <View style={styles.attendeesRow}>
            <View style={styles.avatarStack}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }}
                style={[styles.stackAvatar, { zIndex: 3 }]}
              />
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }}
                style={[styles.stackAvatar, { left: 14, zIndex: 2 }]}
              />
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }}
                style={[styles.stackAvatar, { left: 28, zIndex: 1 }]}
              />
            </View>
            <Text style={styles.attendeesText}>+{event.attendees || 20} Going</Text>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={14} color={COLORS.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {event.address || event.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Vertical card layout (Nearby Events, Search, See All)
  return (
    <TouchableOpacity style={styles.cardVertical} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: event.image }} style={styles.imageVertical} resizeMode="cover" />

      <View style={styles.contentVertical}>
        <Text style={styles.dateTimeText}>
          {event.date} • {event.startTime}
        </Text>
        <Text style={styles.titleVertical} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={14} color={COLORS.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {event.address || event.location}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.bookmarkBtnVertical, bookmarked && styles.bookmarkBtnVerticalActive]}
        onPress={handleBookmarkPress}
      >
        <Ionicons
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={18}
          color={bookmarked ? COLORS.white : COLORS.badgeText}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Horizontal Styles
  cardHorizontal: {
    width: 240,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 10,
    marginRight: 16,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  imageWrapperHorizontal: {
    width: '100%',
    height: 140,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  imageHorizontal: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  dateBadgeDay: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.badgeText,
  },
  dateBadgeMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.badgeText,
    textTransform: 'uppercase',
  },
  bookmarkCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkCircleActive: {
    backgroundColor: COLORS.badgeText,
  },
  contentHorizontal: {
    marginTop: 10,
    paddingHorizontal: 4,
  },
  titleHorizontal: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarStack: {
    width: 50,
    height: 24,
    position: 'relative',
  },
  stackAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  attendeesText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
    flex: 1,
  },

  // Vertical Styles
  cardVertical: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  imageVertical: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  contentVertical: {
    flex: 1,
    marginLeft: 12,
    marginRight: 30,
  },
  dateTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  titleVertical: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
    lineHeight: 20,
  },
  bookmarkBtnVertical: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.badgeBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkBtnVerticalActive: {
    backgroundColor: COLORS.badgeText,
  },
});
