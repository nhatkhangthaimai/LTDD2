import { MOCK_ORGANIZERS } from '../data/organizers';
import { MOCK_FRIENDS, CURRENT_USER } from '../data/users';
import { storageService } from '../storage/storageService';

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const userService = {
  async getProfile() {
    await delay(200);
    const sessionUser = await storageService.getUserSession();
    return sessionUser || CURRENT_USER;
  },

  async updateProfile(updatedFields) {
    await delay(400);
    const current = await this.getProfile();
    const updated = { ...current, ...updatedFields };
    await storageService.saveUserSession(updated);
    return updated;
  },

  async getOrganizers() {
    await delay(300);
    const followedIds = await storageService.getFollowedOrganizers();
    return MOCK_ORGANIZERS.map(org => ({
      ...org,
      isFollowed: followedIds.includes(org.id),
    }));
  },

  async getOrganizerById(id) {
    await delay(200);
    const org = MOCK_ORGANIZERS.find(o => o.id === id);
    if (!org) {
      throw new Error('Organizer not found');
    }
    const followedIds = await storageService.getFollowedOrganizers();
    return {
      ...org,
      isFollowed: followedIds.includes(org.id),
    };
  },

  async toggleFollowOrganizer(organizerId) {
    await delay(300);
    const followedIds = await storageService.toggleFollowOrganizer(organizerId);
    return followedIds.includes(organizerId);
  },

  async getFriends() {
    await delay(250);
    return MOCK_FRIENDS;
  },
};
