import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthNavigator } from './AuthNavigator';
import { DrawerNavigator } from './DrawerNavigator';

import { EventDetailsScreen } from '../screens/events/EventDetailsScreen';
import { OrganizerProfileScreen } from '../screens/profile/OrganizerProfileScreen';
import { SearchScreen } from '../screens/events/SearchScreen';
import { FilterScreen } from '../screens/events/FilterScreen';
import { SeeAllEventsScreen } from '../screens/events/SeeAllEventsScreen';
import { EmptyEventsScreen } from '../screens/events/EmptyEventsScreen';

import { NotificationScreen } from '../screens/notifications/NotificationScreen';
import { EmptyNotificationScreen } from '../screens/notifications/EmptyNotificationScreen';

import { InviteFriendScreen } from '../screens/social/InviteFriendScreen';
import { BookmarkScreen } from '../screens/events/BookmarkScreen';

import { TicketBookingScreen } from '../screens/tickets/TicketBookingScreen';
import { BookingConfirmationScreen } from '../screens/tickets/BookingConfirmationScreen';
import { MyTicketsScreen } from '../screens/tickets/MyTicketsScreen';

import { MessagesScreen } from '../screens/chat/MessagesScreen';
import { ChatDetailScreen } from '../screens/chat/ChatDetailScreen';

import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { CalendarScreen } from '../screens/calendar/CalendarScreen';

import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { ContactUsScreen } from '../screens/settings/ContactUsScreen';
import { HelpFaqScreen } from '../screens/settings/HelpFaqScreen';

const RootStack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Stack */}
        <RootStack.Screen name="Auth" component={AuthNavigator} />

        {/* Main Application with Drawer & Bottom Tabs */}
        <RootStack.Screen name="MainDrawer" component={DrawerNavigator} />

        {/* Event Detail & Search Screens */}
        <RootStack.Screen name="EventDetails" component={EventDetailsScreen} />
        <RootStack.Screen name="OrganizerProfile" component={OrganizerProfileScreen} />
        <RootStack.Screen name="Search" component={SearchScreen} />
        <RootStack.Screen name="Filter" component={FilterScreen} />
        <RootStack.Screen name="SeeAllEvents" component={SeeAllEventsScreen} />
        <RootStack.Screen name="EmptyEvents" component={EmptyEventsScreen} />

        {/* Notification & Social */}
        <RootStack.Screen name="Notification" component={NotificationScreen} />
        <RootStack.Screen name="EmptyNotification" component={EmptyNotificationScreen} />
        <RootStack.Screen name="InviteFriend" component={InviteFriendScreen} />
        <RootStack.Screen name="Bookmark" component={BookmarkScreen} />

        {/* Tickets & Booking */}
        <RootStack.Screen name="TicketBooking" component={TicketBookingScreen} />
        <RootStack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
        <RootStack.Screen name="MyTickets" component={MyTicketsScreen} />

        {/* Messaging & Chat */}
        <RootStack.Screen name="Messages" component={MessagesScreen} />
        <RootStack.Screen name="ChatDetail" component={ChatDetailScreen} />

        {/* Profile & Settings */}
        <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
        <RootStack.Screen name="Calendar" component={CalendarScreen} />
        <RootStack.Screen name="Settings" component={SettingsScreen} />
        <RootStack.Screen name="ContactUs" component={ContactUsScreen} />
        <RootStack.Screen name="HelpFaq" component={HelpFaqScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
