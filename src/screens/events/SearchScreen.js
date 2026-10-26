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
import { SearchBar } from '../../components/SearchBar';
import { EventCard } from '../../components/EventCard';
import { EmptyState } from '../../components/EmptyState';
import { eventService } from '../../services/eventService';
import { storageService } from '../../storage/storageService';

export const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    const history = await storageService.getRecentSearches();
    setRecentSearches(history);
  };

  const handleSearch = async (text) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const filtered = await eventService.searchEvents(text);
      setResults(filtered);
    } catch (e) {
      console.error('Search error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecent = (term) => {
    handleSearch(term);
  };

  const saveToHistory = async () => {
    if (query.trim() && !recentSearches.includes(query.trim())) {
      const updated = [query.trim(), ...recentSearches.slice(0, 5)];
      setRecentSearches(updated);
      await storageService.saveRecentSearches(updated);
    }
  };

  const clearHistory = async () => {
    setRecentSearches([]);
    await storageService.saveRecentSearches([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar with Back and Search */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <SearchBar
          value={query}
          onChangeText={handleSearch}
          onSubmit={saveToHistory}
          placeholder="Search..."
          autoFocus={true}
          showFilterButton={true}
          onFilterPress={() => navigation.navigate('Filter')}
          style={styles.searchBar}
        />
      </View>

      {/* Main Area: Recent searches OR Search Results */}
      {query.trim() === '' ? (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recent Searches</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearText}>Clear all</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.tagsContainer}>
            {recentSearches.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.historyTag}
                onPress={() => handleSelectRecent(item)}
              >
                <Ionicons name="time-outline" size={14} color={COLORS.textMuted} style={styles.tagIcon} />
                <Text style={styles.tagText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : results.length === 0 && !loading ? (
        <EmptyState
          icon="search-outline"
          title="No Results Found"
          description={`We couldn't find any events matching "${query}". Try searching for another keyword or filter.`}
          buttonTitle="EXPLORE ALL EVENTS"
          onButtonPress={() => navigation.navigate('SeeAllEvents')}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              layout="vertical"
              onPress={() => {
                saveToHistory();
                navigation.navigate('EventDetails', { eventId: item.id });
              }}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backBtn: {
    padding: 8,
    marginRight: 4,
  },
  searchBar: {
    flex: 1,
  },
  historyContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  clearText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  historyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagIcon: {
    marginRight: 6,
  },
  tagText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
});
