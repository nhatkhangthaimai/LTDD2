import { MOCK_EVENTS } from '../data/events';
import { storageService } from '../storage/storageService';

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const eventService = {
  async getEvents() {
    await delay(300);
    return MOCK_EVENTS;
  },

  async getEventById(id) {
    await delay(200);
    const event = MOCK_EVENTS.find(e => e.id === id);
    if (!event) {
      throw new Error('Event not found.');
    }
    return event;
  },

  async searchEvents(query = '', category = 'all') {
    await delay(300);
    let results = [...MOCK_EVENTS];
    if (category && category.toLowerCase() !== 'all') {
      results = results.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    if (query.trim() !== '') {
      const q = query.toLowerCase().trim();
      results = results.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.address.toLowerCase().includes(q)
      );
    }
    return results;
  },

  async filterEvents({ category = 'all', timeFilter = 'all', priceMin = 0, priceMax = 500, location = '' }) {
    await delay(350);
    let results = [...MOCK_EVENTS];

    if (category && category.toLowerCase() !== 'all') {
      results = results.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }

    if (priceMin !== undefined && priceMax !== undefined) {
      results = results.filter(e => e.price >= priceMin && e.price <= priceMax);
    }

    if (location && location.trim() !== '') {
      const loc = location.toLowerCase().trim();
      results = results.filter(e => e.location.toLowerCase().includes(loc) || e.address.toLowerCase().includes(loc));
    }

    if (timeFilter && timeFilter !== 'all') {
      if (timeFilter === 'Today') {
        results = results.filter(e => e.isUpcoming && e.date.includes('2026'));
      } else if (timeFilter === 'Tomorrow') {
        results = results.filter(e => e.isUpcoming);
      } else if (timeFilter === 'This week') {
        results = results.filter(e => e.isUpcoming);
      }
    }

    return results;
  },

  async getUpcomingEvents() {
    await delay(250);
    return MOCK_EVENTS.filter(e => e.isUpcoming);
  },

  async getPastEvents() {
    await delay(250);
    return MOCK_EVENTS.filter(e => e.isPast);
  },

  async getNearbyEvents() {
    await delay(250);
    return MOCK_EVENTS.slice(0, 10);
  },

  async getBookmarks() {
    const bookmarkedIds = await storageService.getBookmarks();
    return MOCK_EVENTS.filter(e => bookmarkedIds.includes(e.id));
  },

  async toggleBookmark(eventId) {
    const updatedIds = await storageService.toggleBookmark(eventId);
    return updatedIds.includes(eventId);
  },

  async isBookmarked(eventId) {
    const bookmarkedIds = await storageService.getBookmarks();
    return bookmarkedIds.includes(eventId);
  },
};
