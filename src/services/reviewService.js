import { INITIAL_REVIEWS } from '../data/reviews';
import { storageService } from '../storage/storageService';

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const reviewService = {
  async getOrganizerReviews(organizerId) {
    await delay(300);
    const stored = await storageService.getReviews();
    const reviewsList = stored || INITIAL_REVIEWS;
    if (!stored) {
      await storageService.saveReviews(INITIAL_REVIEWS);
    }
    return reviewsList.filter(r => r.organizerId === organizerId);
  },

  async addReview(organizerId, rating, comment, userName, userAvatar) {
    await delay(400);
    if (!comment || !comment.trim()) {
      throw new Error('Review content cannot be empty.');
    }
    const stored = (await storageService.getReviews()) || INITIAL_REVIEWS;
    const newReview = {
      id: 'rev_' + Date.now(),
      organizerId,
      userName: userName || 'Ashfak Sayem',
      userAvatar: userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      rating: rating || 5,
      date: 'Just now',
      comment: comment.trim(),
    };
    const updated = [newReview, ...stored];
    await storageService.saveReviews(updated);
    return newReview;
  },
};
