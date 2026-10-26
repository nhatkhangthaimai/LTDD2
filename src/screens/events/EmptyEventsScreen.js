import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { EmptyState } from '../../components/EmptyState';

export const EmptyEventsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Events" showBack onBackPress={() => navigation.goBack()} />

      {/* Tabs Row */}
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

      {/* Empty State */}
      <EmptyState
        icon="calendar-outline"
        title="No Upcoming Event"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        buttonTitle="EXPLORE EVENTS"
        onButtonPress={() => navigation.navigate('Explore')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
});
