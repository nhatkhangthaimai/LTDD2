import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { EventCard } from '../../components/EventCard';
import { EmptyState } from '../../components/EmptyState';
import { eventService } from '../../services/eventService';
import { EventContext } from '../../context/EventContext';

export const BookmarkScreen = ({ navigation }) => {
  const { bookmarkedIds } = useContext(EventContext);
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, [bookmarkedIds]);

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      const events = await eventService.getBookmarks();
      setSavedEvents(events);
    } catch (e) {
      console.error('Error loading bookmarks:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Bookmarks" showBack onBackPress={() => navigation.goBack()} />

      {savedEvents.length === 0 ? (
        <EmptyState
          icon="bookmark-outline"
          title="No Saved Events"
          description="You haven't bookmarked any events yet. Tap the bookmark icon on any event to save it here."
          buttonTitle="EXPLORE EVENTS"
          onButtonPress={() => navigation.navigate('Explore')}
        />
      ) : (
        <FlatList
          data={savedEvents}
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
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
