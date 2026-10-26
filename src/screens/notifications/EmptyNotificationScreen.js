import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { EmptyState } from '../../components/EmptyState';

export const EmptyNotificationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Notification" showBack onBackPress={() => navigation.goBack()} />

      <EmptyState
        icon="notifications-outline"
        title="No Notifications!"
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
});
