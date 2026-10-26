import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainTabNavigator } from './MainTabNavigator';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '78%',
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
    </Drawer.Navigator>
  );
};
