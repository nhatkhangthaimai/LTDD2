import { INITIAL_NOTIFICATIONS } from '../data/notifications';
import { storageService } from '../storage/storageService';

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const notificationService = {
  async getNotifications() {
    await delay(300);
    const stored = await storageService.getNotifications();
    if (!stored) {
      await storageService.saveNotifications(INITIAL_NOTIFICATIONS);
      return INITIAL_NOTIFICATIONS;
    }
    return stored;
  },

  async markAllAsRead() {
    await delay(250);
    const list = await this.getNotifications();
    const updated = list.map(item => ({ ...item, read: true }));
    await storageService.saveNotifications(updated);
    return updated;
  },

  async respondInvite(notificationId, action) {
    await delay(300);
    const list = await this.getNotifications();
    const updated = list.map(item => {
      if (item.id === notificationId) {
        return {
          ...item,
          status: action === 'accept' ? 'accepted' : 'rejected',
          read: true,
        };
      }
      return item;
    });
    await storageService.saveNotifications(updated);
    return updated;
  },

  async sendInviteToFriends(friendNames, eventTitle = 'Event') {
    await delay(400);
    const list = await this.getNotifications();
    const newNotif = {
      id: 'n_' + Date.now(),
      user: 'EventHub',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      type: 'invite',
      title: `Sent invitation for ${eventTitle} to ${friendNames.length} friends (${friendNames.join(', ')})`,
      time: 'Just now',
      read: false,
    };
    const updated = [newNotif, ...list];
    await storageService.saveNotifications(updated);
    return updated;
  },
};
