import { storageService } from '../storage/storageService';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const bookingService = {
  async bookTicket(event, quantity = 1, seatTier = 'Standard') {
    await delay(500);
    const totalPrice = (event.price || 0) * quantity;
    const ticketCode = 'EH-' + Math.floor(100000 + Math.random() * 900000);
    const booking = {
      id: 'tkt_' + Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      eventImage: event.image,
      eventDate: event.date,
      eventTime: event.startTime,
      location: event.location,
      address: event.address,
      quantity,
      seatTier,
      unitPrice: event.price,
      totalPrice,
      ticketCode,
      bookingDate: new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed',
    };

    const tickets = await storageService.saveTicket(booking);
    return { success: true, booking, tickets };
  },

  async getMyTickets() {
    await delay(300);
    return await storageService.getTickets();
  },
};
