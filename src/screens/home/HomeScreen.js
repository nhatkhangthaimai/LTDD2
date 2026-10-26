import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SearchBar } from '../../components/SearchBar';
import { CategoryItem } from '../../components/CategoryItem';
import { EventCard } from '../../components/EventCard';
import { CATEGORIES } from '../../data/events';
import { eventService } from '../../services/eventService';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext';

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { unreadNotificationCount } = useContext(EventContext);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, [selectedCategory]);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const upcoming = await eventService.getUpcomingEvents();
      const nearby = await eventService.getNearbyEvents();

      if (selectedCategory !== 'all') {
        const filteredUpcoming = upcoming.filter(
          e => e.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        const filteredNearby = nearby.filter(
          e => e.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setUpcomingEvents(filteredUpcoming);
        setNearbyEvents(filteredNearby);
      } else {
        setUpcomingEvents(upcoming);
        setNearbyEvents(nearby);
      }
    } catch (e) {
      console.error('Error fetching home data:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchHomeData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.white} />}
      >
        {/* Blue Curve Header Section */}
        <View style={styles.headerBackground}>
          {/* Header Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="menu-outline" size={26} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.locationContainer} activeOpacity={0.8}>
              <View style={styles.locationTitleRow}>
                <Text style={styles.locationLabel}>Current Location</Text>
                <Ionicons name="chevron-down" size={14} color="rgba(255,255,255,0.7)" />
              </View>
              <Text style={styles.locationText}>New York, USA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationCircle}
              onPress={() => navigation.navigate('Notification')}
            >
              <Ionicons name="notifications" size={20} color={COLORS.white} />
              {unreadNotificationCount > 0 && <View style={styles.badgeDot} />}
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search..."
            showFilterButton={true}
            onFilterPress={() => navigation.navigate('Filter')}
            onFocus={() => navigation.navigate('Search')}
            style={styles.searchBarHome}
          />

          {/* Category Horizontal Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {CATEGORIES.map((cat) => (
              <CategoryItem
                key={cat.id}
                item={cat}
                isSelected={selectedCategory === cat.id}
                onPress={() => setSelectedCategory(cat.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Content Body */}
        <View style={styles.bodyContent}>
          {/* Upcoming Events Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SeeAllEvents')}>
              <Text style={styles.seeAllText}>See All ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalEventsContent}
          >
            {upcomingEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                layout="horizontal"
                onPress={() => navigation.navigate('EventDetails', { eventId: evt.id })}
              />
            ))}
          </ScrollView>

          {/* Invite Friends Banner */}
          <TouchableOpacity
            style={styles.inviteBanner}
            onPress={() => navigation.navigate('InviteFriend')}
            activeOpacity={0.9}
          >
            <View style={styles.inviteTextContainer}>
              <Text style={styles.inviteTitle}>Invite your friends</Text>
              <Text style={styles.inviteSubtitle}>Get $20 for ticket</Text>
              <View style={styles.invitePill}>
                <Text style={styles.invitePillText}>INVITE</Text>
              </View>
            </View>

            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&q=80' }}
              style={styles.inviteImage}
            />
          </TouchableOpacity>

          {/* Nearby Events Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby You</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SeeAllEvents')}>
              <Text style={styles.seeAllText}>See All ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.verticalList}>
            {nearbyEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                layout="vertical"
                onPress={() => navigation.navigate('EventDetails', { eventId: evt.id })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bodyBg,
  },
  headerBackground: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    alignItems: 'center',
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 2,
  },
  notificationCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5656',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  searchBarHome: {
    marginVertical: 4,
  },
  categoriesContent: {
    paddingTop: 12,
    paddingBottom: 4,
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  horizontalEventsContent: {
    paddingBottom: 16,
  },
  inviteBanner: {
    backgroundColor: '#00F0FF',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
    overflow: 'hidden',
  },
  inviteTextContainer: {
    flex: 1,
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  inviteSubtitle: {
    fontSize: 13,
    color: 'rgba(23, 23, 47, 0.8)',
    marginTop: 4,
    marginBottom: 12,
  },
  invitePill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  invitePillText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  inviteImage: {
    width: 85,
    height: 85,
    borderRadius: 14,
  },
  verticalList: {
    paddingBottom: 30,
  },
});
