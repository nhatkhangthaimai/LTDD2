import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SearchBar } from '../../components/SearchBar';
import { CategoryItem } from '../../components/CategoryItem';
import { CATEGORIES, MOCK_EVENTS } from '../../data/events';
import { EventCard } from '../../components/EventCard';

// Safely import MapView only on native mobile (iOS / Android)
let MapView = null;
let Marker = null;
let PROVIDER_DEFAULT = null;

if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
    PROVIDER_DEFAULT = Maps.PROVIDER_DEFAULT;
  } catch (e) {
    console.warn('react-native-maps is not available on this platform.');
  }
}

export const MapViewScreen = ({ route, navigation }) => {
  const { targetEvent } = route.params || {};
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEvent, setActiveEvent] = useState(targetEvent || MOCK_EVENTS[0]);
  const [filteredEvents, setFilteredEvents] = useState(MOCK_EVENTS);

  const [region, setRegion] = useState({
    latitude: targetEvent ? targetEvent.latitude : 37.7749,
    longitude: targetEvent ? targetEvent.longitude : -122.4194,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });

  useEffect(() => {
    let result = [...MOCK_EVENTS];
    if (selectedCategory !== 'all') {
      result = result.filter(e => e.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        e => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      );
    }
    setFilteredEvents(result);
    if (result.length > 0 && !targetEvent) {
      setActiveEvent(result[0]);
    }
  }, [selectedCategory, searchQuery]);

  const handleMarkerSelect = (evt) => {
    setActiveEvent(evt);
    setRegion({
      latitude: evt.latitude,
      longitude: evt.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Render Native Map on iOS/Android OR Interactive Styled Map on Web */}
      {Platform.OS !== 'web' && MapView ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          {filteredEvents.map((evt) => {
            const isSelected = activeEvent?.id === evt.id;
            return (
              <Marker
                key={evt.id}
                coordinate={{ latitude: evt.latitude, longitude: evt.longitude }}
                onPress={() => handleMarkerSelect(evt)}
              >
                <View style={[styles.customMarker, isSelected && styles.selectedMarker]}>
                  <Ionicons
                    name={
                      evt.category === 'Music'
                        ? 'musical-notes'
                        : evt.category === 'Sports'
                        ? 'basketball'
                        : evt.category === 'Food'
                        ? 'restaurant'
                        : 'location-sharp'
                    }
                    size={16}
                    color={isSelected ? COLORS.white : COLORS.primary}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
      ) : (
        /* Web Fallback Interactive Grid Map View */
        <View style={styles.webMapContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
            }}
            style={styles.webMapImage}
          />
          <View style={styles.webMapOverlay}>
            {filteredEvents.slice(0, 6).map((evt, idx) => {
              const isSelected = activeEvent?.id === evt.id;
              const positions = [
                { top: '30%', left: '25%' },
                { top: '45%', left: '55%' },
                { top: '60%', left: '35%' },
                { top: '25%', left: '70%' },
                { top: '70%', left: '65%' },
                { top: '50%', left: '15%' },
              ];
              const pos = positions[idx % positions.length];
              return (
                <TouchableOpacity
                  key={evt.id}
                  style={[styles.customMarker, isSelected && styles.selectedMarker, styles.webMarkerPos, pos]}
                  onPress={() => handleMarkerSelect(evt)}
                >
                  <Ionicons
                    name={
                      evt.category === 'Music'
                        ? 'musical-notes'
                        : evt.category === 'Sports'
                        ? 'basketball'
                        : evt.category === 'Food'
                        ? 'restaurant'
                        : 'location-sharp'
                    }
                    size={16}
                    color={isSelected ? COLORS.white : COLORS.primary}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Top Floating Controls */}
      <View style={styles.topContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Find for Food or restaurant..."
          showFilterButton={true}
          onFilterPress={() => navigation.navigate('Filter')}
          style={styles.searchBarMap}
        />

        {/* Category horizontal scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
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

      {/* Right Locate Me Button */}
      <TouchableOpacity
        style={styles.locateBtn}
        onPress={() => {
          if (activeEvent) {
            setRegion({
              latitude: activeEvent.latitude,
              longitude: activeEvent.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            });
          }
        }}
      >
        <Ionicons name="navigate-outline" size={20} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Bottom Floating Event Preview Card */}
      {activeEvent && (
        <View style={styles.bottomCardContainer}>
          <EventCard
            event={activeEvent}
            layout="vertical"
            onPress={() => navigation.navigate('EventDetails', { eventId: activeEvent.id })}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webMapContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#E5E9F0',
  },
  webMapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  webMapOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  webMarkerPos: {
    position: 'absolute',
  },
  topContainer: {
    position: 'absolute',
    top: 10,
    left: 16,
    right: 16,
  },
  searchBarMap: {
    marginBottom: 8,
  },
  categoriesRow: {
    flexDirection: 'row',
  },
  customMarker: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  selectedMarker: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.white,
    transform: [{ scale: 1.2 }],
  },
  locateBtn: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomCardContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});
