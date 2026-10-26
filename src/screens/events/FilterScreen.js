import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { CATEGORIES } from '../../data/events';
import { eventService } from '../../services/eventService';

export const FilterScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTime, setSelectedTime] = useState('Today'); // 'Today' | 'Tomorrow' | 'This week'
  const [location, setLocation] = useState('New York, USA');
  const [priceRange, setPriceRange] = useState([20, 120]);

  const handleReset = () => {
    setSelectedCategory('all');
    setSelectedTime('Today');
    setLocation('New York, USA');
    setPriceRange([20, 120]);
  };

  const handleApply = async () => {
    try {
      const filtered = await eventService.filterEvents({
        category: selectedCategory,
        timeFilter: selectedTime,
        priceMin: priceRange[0],
        priceMax: priceRange[1],
        location,
      });

      if (filtered.length === 0) {
        Alert.alert(
          'No Results',
          'No events match your selected filters. Showing all events instead.',
          [{ text: 'OK', onPress: () => navigation.navigate('SeeAllEvents') }]
        );
      } else {
        navigation.navigate('SeeAllEvents', { filteredResults: filtered });
      }
    } catch (e) {
      Alert.alert('Filter Error', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Filter" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories Circle Icons Row */}
        <Text style={styles.sectionLabel}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.catCircleItem}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <View style={[styles.catCircle, isSelected && styles.catCircleSelected]}>
                  <Ionicons
                    name={cat.icon}
                    size={22}
                    color={isSelected ? COLORS.white : COLORS.textSecondary}
                  />
                </View>
                <Text style={[styles.catName, isSelected && styles.catNameSelected]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Time & Date */}
        <Text style={styles.sectionLabel}>Time & Date</Text>
        <View style={styles.timeRow}>
          {['Today', 'Tomorrow', 'This week'].map((time) => {
            const isSelected = selectedTime === time;
            return (
              <TouchableOpacity
                key={time}
                style={[styles.timePill, isSelected && styles.timePillSelected]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.calendarPickerBtn}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
          <Text style={styles.calendarPickerText}>Choose from calendar ›</Text>
        </TouchableOpacity>

        {/* Location */}
        <Text style={styles.sectionLabel}>Location</Text>
        <TouchableOpacity style={styles.locationSelector} activeOpacity={0.8}>
          <View style={styles.locationIconBox}>
            <Ionicons name="location-sharp" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.locationValueText}>{location}</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Price Range */}
        <View style={styles.priceHeader}>
          <Text style={styles.sectionLabel}>Select price range</Text>
          <Text style={styles.priceRangeValue}>
            ${priceRange[0]}-${priceRange[1]}
          </Text>
        </View>

        <View style={styles.pricePillsRow}>
          {[
            { label: '$0 - $50', range: [0, 50] },
            { label: '$20 - $120', range: [20, 120] },
            { label: '$100 - $300', range: [100, 300] },
          ].map((item, idx) => {
            const isSelected = priceRange[0] === item.range[0] && priceRange[1] === item.range[1];
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.pricePill, isSelected && styles.pricePillSelected]}
                onPress={() => setPriceRange(item.range)}
              >
                <Text style={[styles.pricePillText, isSelected && styles.pricePillTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>RESET</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyText}>APPLY</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 10,
    paddingBottom: 100,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  catCircleItem: {
    alignItems: 'center',
    marginRight: 18,
  },
  catCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#F4F5FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  catCircleSelected: {
    backgroundColor: COLORS.primary,
  },
  catName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  catNameSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  timeRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timePill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    marginRight: 10,
  },
  timePillSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  timeTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  calendarPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  calendarPickerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 14,
  },
  locationIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationValueText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRangeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  pricePillsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  pricePill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F4F5FB',
    marginRight: 8,
  },
  pricePillSelected: {
    backgroundColor: COLORS.primary,
  },
  pricePillText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  pricePillTextSelected: {
    color: COLORS.white,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F1F5',
  },
  resetBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  applyBtn: {
    flex: 1.5,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
});
