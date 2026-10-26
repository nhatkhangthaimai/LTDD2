import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { EventCard } from '../../components/EventCard';
import { MOCK_EVENTS } from '../../data/events';

export const CalendarScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(14);
  const monthName = 'March 2026';

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Match events for selected day demo
  const dayEvents = MOCK_EVENTS.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Calendar" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month Header */}
        <View style={styles.monthHeader}>
          <TouchableOpacity style={styles.arrowBtn}>
            <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{monthName}</Text>
          <TouchableOpacity style={styles.arrowBtn}>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Days of Week Row */}
        <View style={styles.weekRow}>
          {weekDays.map((w, idx) => (
            <Text key={idx} style={styles.weekText}>
              {w}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.gridContainer}>
          {daysInMonth.map((day) => {
            const isSelected = selectedDay === day;
            const hasEvent = [10, 14, 18, 24, 28].includes(day);

            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayCell,
                  isSelected && styles.dayCellSelected,
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                  {day}
                </Text>
                {hasEvent && !isSelected && <View style={styles.eventDot} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Date Events */}
        <View style={styles.eventsSection}>
          <Text style={styles.eventsSectionTitle}>
            Events on {selectedDay} March, 2026
          </Text>

          {dayEvents.map((evt) => (
            <EventCard
              key={evt.id}
              event={evt}
              layout="vertical"
              onPress={() => navigation.navigate('EventDetails', { eventId: evt.id })}
            />
          ))}
        </View>
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
    paddingTop: 10,
    paddingBottom: 40,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowBtn: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekText: {
    width: '13%',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  dayCell: {
    width: '14.28%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
    borderRadius: 21,
  },
  dayText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  dayTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  eventsSection: {
    marginTop: 10,
  },
  eventsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
});
