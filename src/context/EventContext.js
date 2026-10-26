import React, { createContext, useState, useEffect } from 'react';
import { eventService } from '../services/eventService';
import { bookingService } from '../services/bookingService';
import { notificationService } from '../services/notificationService';
import { userService } from '../services/userService';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [followedOrganizers, setFollowedOrganizers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const bookmarks = await eventService.getBookmarks();
      setBookmarkedIds(bookmarks.map(b => b.id));

      const myTickets = await bookingService.getMyTickets();
      setTickets(myTickets);

      const notifs = await notificationService.getNotifications();
      setNotifications(notifs);

      const orgs = await userService.getOrganizers();
      setFollowedOrganizers(orgs.filter(o => o.isFollowed).map(o => o.id));
    } catch (e) {
      console.error('Error loading EventContext data:', e);
    }
  };

  const toggleBookmark = async (eventId) => {
    const isNowBookmarked = await eventService.toggleBookmark(eventId);
    if (isNowBookmarked) {
      setBookmarkedIds(prev => [...prev, eventId]);
    } else {
      setBookmarkedIds(prev => prev.filter(id => id !== eventId));
    }
    return isNowBookmarked;
  };

  const isBookmarked = (eventId) => bookmarkedIds.includes(eventId);

  const bookTicket = async (event, quantity, seatTier) => {
    const res = await bookingService.bookTicket(event, quantity, seatTier);
    if (res.success) {
      setTickets(res.tickets);
    }
    return res;
  };

  const toggleFollowOrganizer = async (organizerId) => {
    const isNowFollowed = await userService.toggleFollowOrganizer(organizerId);
    if (isNowFollowed) {
      setFollowedOrganizers(prev => [...prev, organizerId]);
    } else {
      setFollowedOrganizers(prev => prev.filter(id => id !== organizerId));
    }
    return isNowFollowed;
  };

  const isOrganizerFollowed = (organizerId) => followedOrganizers.includes(organizerId);

  const markNotificationsAsRead = async () => {
    const updated = await notificationService.markAllAsRead();
    setNotifications(updated);
  };

  const respondInvite = async (notifId, action) => {
    const updated = await notificationService.respondInvite(notifId, action);
    setNotifications(updated);
  };

  const inviteFriends = async (friendNames, eventTitle) => {
    const updated = await notificationService.sendInviteToFriends(friendNames, eventTitle);
    setNotifications(updated);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <EventContext.Provider
      value={{
        bookmarkedIds,
        tickets,
        notifications,
        followedOrganizers,
        unreadNotificationCount,
        toggleBookmark,
        isBookmarked,
        bookTicket,
        toggleFollowOrganizer,
        isOrganizerFollowed,
        markNotificationsAsRead,
        respondInvite,
        inviteFriends,
        refreshData: loadData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
