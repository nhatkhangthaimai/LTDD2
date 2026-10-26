import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { EventContext } from '../../context/EventContext';

export const TicketBookingScreen = ({ route, navigation }) => {
  const { event } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState('VIP'); // 'VIP' | 'Standard' | 'Economy'
  const [loading, setLoading] = useState(false);

  const { bookTicket } = useContext(EventContext);

  if (!event) return null;

  const tierPrices = {
    VIP: (event.price || 100) + 50,
    Standard: event.price || 100,
    Economy: Math.max(20, (event.price || 100) - 30),
  };

  const unitPrice = tierPrices[selectedTier];
  const totalPrice = unitPrice * quantity;

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      const res = await bookTicket({ ...event, price: unitPrice }, quantity, selectedTier);
      if (res.success) {
        navigation.replace('BookingConfirmation', { booking: res.booking });
      }
    } catch (e) {
      Alert.alert('Booking Failed', e.message || 'Error creating ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Ticket Booking" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Event Preview Card */}
        <View style={styles.eventCardPreview}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View style={styles.eventCardInfo}>
            <Text style={styles.eventTitle} numberOfLines={2}>
              {event.title}
            </Text>
            <Text style={styles.eventDate}>
              {event.date} • {event.startTime}
            </Text>
            <Text style={styles.eventLocation} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
        </View>

        {/* Seat Tier Selection */}
        <Text style={styles.sectionTitle}>Select Ticket Tier</Text>
        <View style={styles.tiersContainer}>
          {[
            { id: 'VIP', label: 'VIP Pass', price: tierPrices.VIP },
            { id: 'Standard', label: 'Standard Pass', price: tierPrices.Standard },
            { id: 'Economy', label: 'Economy Pass', price: tierPrices.Economy },
          ].map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <TouchableOpacity
                key={tier.id}
                style={[styles.tierCard, isSelected && styles.tierCardSelected]}
                onPress={() => setSelectedTier(tier.id)}
              >
                <View>
                  <Text style={[styles.tierLabel, isSelected && styles.tierLabelSelected]}>
                    {tier.label}
                  </Text>
                  <Text style={styles.tierSub}>Includes full entry & access</Text>
                </View>
                <Text style={[styles.tierPrice, isSelected && styles.tierPriceSelected]}>
                  ${tier.price}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quantity Counter */}
        <Text style={styles.sectionTitle}>Select Quantity</Text>
        <View style={styles.quantityBox}>
          <Text style={styles.quantityLabel}>Number of Seats</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Ionicons name="remove" size={18} color={COLORS.primary} />
            </TouchableOpacity>

            <Text style={styles.counterValue}>{quantity}</Text>

            <TouchableOpacity style={styles.counterBtn} onPress={() => setQuantity(quantity + 1)}>
              <Ionicons name="add" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {selectedTier} Ticket (${unitPrice} x {quantity})
            </Text>
            <Text style={styles.summaryValue}>${totalPrice}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service & Tech Fee</Text>
            <Text style={styles.summaryValue}>$0.00 (Demo Free)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalValue}>${totalPrice}</Text>
          </View>
        </View>

        <PrimaryButton
          title={`CONFIRM & BOOK ($${totalPrice})`}
          onPress={handleConfirmBooking}
          loading={loading}
          style={styles.bookBtn}
        />
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
  eventCardPreview: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FE',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  eventImage: {
    width: 76,
    height: 76,
    borderRadius: 12,
    marginRight: 12,
  },
  eventCardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  tiersContainer: {
    marginBottom: 20,
  },
  tierCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#E4DFDF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  tierCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F8F9FE',
  },
  tierLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  tierLabelSelected: {
    color: COLORS.primary,
  },
  tierSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  tierPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  tierPriceSelected: {
    color: COLORS.primary,
  },
  quantityBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginHorizontal: 16,
  },
  summaryBox: {
    backgroundColor: '#F8F9FE',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4DFDF',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  bookBtn: {
    width: '100%',
  },
});
