import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { PrimaryButton } from '../../components/PrimaryButton';

export const BookingConfirmationScreen = ({ route, navigation }) => {
  const { booking } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={72} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your ticket for <Text style={styles.boldText}>{booking?.eventTitle}</Text> has been successfully booked.
        </Text>

        {/* Ticket Summary Card */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <Text style={styles.ticketCodeLabel}>TICKET CODE</Text>
            <Text style={styles.ticketCode}>{booking?.ticketCode || 'EH-849204'}</Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.label}>Seat Tier:</Text>
            <Text style={styles.value}>{booking?.seatTier} ({booking?.quantity} seats)</Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.label}>Date & Time:</Text>
            <Text style={styles.value}>{booking?.eventDate} ({booking?.eventTime})</Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{booking?.location}</Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.label}>Total Paid:</Text>
            <Text style={styles.priceValue}>${booking?.totalPrice}</Text>
          </View>

          {/* Barcode Mockup */}
          <View style={styles.barcodeContainer}>
            <View style={styles.barcodeLines}>
              {Array.from({ length: 24 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.barcodeBar,
                    { width: (i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1), marginHorizontal: 2 },
                  ]}
                />
              ))}
            </View>
            <Text style={styles.barcodeText}>{booking?.ticketCode || 'EH-849204'}</Text>
          </View>
        </View>

        <PrimaryButton
          title="VIEW MY TICKETS"
          onPress={() => navigation.replace('MyTickets')}
          style={styles.actionBtn}
        />

        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.replace('MainDrawer')}>
          <Text style={styles.homeBtnText}>GO TO HOME</Text>
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
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  boldText: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  ticketCard: {
    width: '100%',
    backgroundColor: '#F8F9FE',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    marginBottom: 24,
  },
  ticketHeader: {
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4DFDF',
  },
  ticketCodeLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '700',
    letterSpacing: 1,
  },
  ticketCode: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 2,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
  barcodeContainer: {
    marginTop: 14,
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E4DFDF',
  },
  barcodeLines: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  barcodeBar: {
    height: '100%',
    backgroundColor: COLORS.textPrimary,
  },
  barcodeText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    letterSpacing: 2,
  },
  actionBtn: {
    width: '100%',
    marginBottom: 12,
  },
  homeBtn: {
    paddingVertical: 10,
  },
  homeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
});
