import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { EventCard } from '../../components/EventCard';
import { EmptyState } from '../../components/EmptyState';
import { LoadingView } from '../../components/LoadingView';
import { eventService } from '../../services/eventService';

export const SeeAllEventsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, [activeTab]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      if (activeTab === 'upcoming') {
        const data = await eventService.getUpcomingEvents();
        setEvents(data);
      } else {
        const data = await eventService.getPastEvents();
        setEvents(data);
      }
    } catch (e) {
      console.error('Error loading events:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Events"
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon={
          <View style={styles.rightHeaderIcons}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search-outline" size={22} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Filter')}>
              <Ionicons name="options-outline" size={22} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'upcoming' && styles.activeTabBtn]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            UPCOMING
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'past' && styles.activeTabBtn]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            PAST EVENTS
          </Text>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      {loading ? (
        <LoadingView message="Loading Events..." />
      ) : events.length === 0 ? (
        <EmptyState
          icon="calendar-outline"
          title={`No ${activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Events`}
          description="There are currently no events matching this category."
        />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              layout="vertical"
              onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  rightHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 8,
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F1F5',
    borderRadius: 24,
    marginHorizontal: 20,
    marginVertical: 14,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTabBtn: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});
