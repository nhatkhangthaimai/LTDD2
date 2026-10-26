import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { EmptyState } from '../../components/EmptyState';
import { EventContext } from '../../context/EventContext';

export const MyTicketsScreen = ({ navigation }) => {
  const { tickets } = useContext(EventContext);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="My Tickets" showBack onBackPress={() => navigation.goBack()} />

      {tickets.length === 0 ? (
        <EmptyState
          icon="ticket-outline"
          title="No Tickets Booked"
          description="You haven't booked any event tickets yet. Explore events and book your first experience!"
          buttonTitle="EXPLORE EVENTS"
          onButtonPress={() => navigation.navigate('Explore')}
        />
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.ticketCard}>
              <View style={styles.cardHeader}>
                <Image source={{ uri: item.eventImage }} style={styles.eventImg} />
                <View style={styles.headerInfo}>
                  <Text style={styles.ticketCode}>{item.ticketCode}</Text>
                  <Text style={styles.eventTitle} numberOfLines={2}>
                    {item.eventTitle}
                  </Text>
                  <Text style={styles.eventDate}>{item.eventDate}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Seat Tier:</Text>
                  <Text style={styles.val}>{item.seatTier} ({item.quantity} Qty)</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Location:</Text>
                  <Text style={styles.val}>{item.location}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Total Price:</Text>
                  <Text style={styles.priceVal}>${item.totalPrice}</Text>
                </View>
              </View>

              <View style={styles.qrRow}>
                <Ionicons name="qr-code-outline" size={32} color={COLORS.primary} />
                <Text style={styles.qrHint}>Show this code at event entrance</Text>
              </View>
            </View>
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
  ticketCard: {
    backgroundColor: '#F8F9FE',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E4DFDF',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  eventImg: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketCode: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  eventDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: '#E4DFDF',
    paddingTop: 10,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  val: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceVal: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
  qrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 12,
  },
  qrHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 10,
    fontWeight: '500',
  },
});
