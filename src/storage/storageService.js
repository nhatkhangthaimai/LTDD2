import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_SESSION: '@eventhub_user_session',
  USERS_LIST: '@eventhub_registered_users',
  BOOKMARKS: '@eventhub_bookmarks',
  TICKETS: '@eventhub_tickets',
  NOTIFICATIONS: '@eventhub_notifications',
  REVIEWS: '@eventhub_reviews',
  FOLLOWED_ORGANIZERS: '@eventhub_followed_organizers',
  ONBOARDING_SEEN: '@eventhub_onboarding_seen',
  RECENT_SEARCHES: '@eventhub_recent_searches',
};

export const storageService = {
  // Onboarding
  async setOnboardingSeen(seen = true) {
    try {
      await AsyncStorage.setItem(KEYS.ONBOARDING_SEEN, JSON.stringify(seen));
    } catch (e) {
      console.error('Error saving onboarding state:', e);
    }
  },

  async getOnboardingSeen() {
    try {
      const value = await AsyncStorage.getItem(KEYS.ONBOARDING_SEEN);
      return value ? JSON.parse(value) : false;
    } catch (e) {
      return false;
    }
  },

  // Auth Session
  async saveUserSession(user) {
    try {
      await AsyncStorage.setItem(KEYS.USER_SESSION, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user session:', e);
    }
  },

  async getUserSession() {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER_SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  async clearUserSession() {
    try {
      await AsyncStorage.removeItem(KEYS.USER_SESSION);
    } catch (e) {
      console.error('Error clearing user session:', e);
    }
  },

  // Registered Users (for local Auth demo)
  async getRegisteredUsers() {
    try {
      const data = await AsyncStorage.getItem(KEYS.USERS_LIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async saveRegisteredUser(newUser) {
    try {
      const users = await this.getRegisteredUsers();
      const existingIndex = users.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());
      if (existingIndex >= 0) {
        users[existingIndex] = { ...users[existingIndex], ...newUser };
      } else {
        users.push(newUser);
      }
      await AsyncStorage.setItem(KEYS.USERS_LIST, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving registered user:', e);
    }
  },

  // Bookmarks
  async getBookmarks() {
    try {
      const data = await AsyncStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async toggleBookmark(eventId) {
    try {
      const bookmarks = await this.getBookmarks();
      let updated;
      if (bookmarks.includes(eventId)) {
        updated = bookmarks.filter(id => id !== eventId);
      } else {
        updated = [...bookmarks, eventId];
      }
      await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error toggling bookmark:', e);
      return [];
    }
  },

  // Tickets
  async getTickets() {
    try {
      const data = await AsyncStorage.getItem(KEYS.TICKETS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async saveTicket(ticket) {
    try {
      const tickets = await this.getTickets();
      tickets.unshift(ticket);
      await AsyncStorage.setItem(KEYS.TICKETS, JSON.stringify(tickets));
      return tickets;
    } catch (e) {
      console.error('Error saving ticket:', e);
      return [];
    }
  },

  // Notifications
  async getNotifications() {
    try {
      const data = await AsyncStorage.getItem(KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : null; // Return null if not initialized so service uses default mock
    } catch (e) {
      return null;
    }
  },

  async saveNotifications(notifications) {
    try {
      await AsyncStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.error('Error saving notifications:', e);
    }
  },

  // Reviews
  async getReviews() {
    try {
      const data = await AsyncStorage.getItem(KEYS.REVIEWS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  async saveReviews(reviews) {
    try {
      await AsyncStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Error saving reviews:', e);
    }
  },

  // Followed Organizers
  async getFollowedOrganizers() {
    try {
      const data = await AsyncStorage.getItem(KEYS.FOLLOWED_ORGANIZERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async toggleFollowOrganizer(organizerId) {
    try {
      const followed = await this.getFollowedOrganizers();
      let updated;
      if (followed.includes(organizerId)) {
        updated = followed.filter(id => id !== organizerId);
      } else {
        updated = [...followed, organizerId];
      }
      await AsyncStorage.setItem(KEYS.FOLLOWED_ORGANIZERS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error toggling follow organizer:', e);
      return [];
    }
  },

  // Recent Searches
  async getRecentSearches() {
    try {
      const data = await AsyncStorage.getItem(KEYS.RECENT_SEARCHES);
      return data ? JSON.parse(data) : ['Music Concert', 'Jazz Festival', 'Art Workshop', 'Food Fair'];
    } catch (e) {
      return ['Music Concert', 'Jazz Festival'];
    }
  },

  async saveRecentSearches(searches) {
    try {
      await AsyncStorage.setItem(KEYS.RECENT_SEARCHES, JSON.stringify(searches));
    } catch (e) {
      console.error('Error saving recent searches:', e);
    }
  },
};
