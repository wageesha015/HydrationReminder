
import * as Notifications from 'expo-notifications';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0EA5E9',
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Reminder',
          tabBarLabel: 'Reminder',
          tabBarIcon: () => <Text>⏰</Text>,
        }}
      />

      <Tabs.Screen
        name="tips"
        options={{
          title: 'Tips',
          tabBarLabel: 'Tips',
          tabBarIcon: () => <Text>💧</Text>,
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarLabel: 'About',
          tabBarIcon: () => <Text>ℹ️</Text>,
        }}
      />
    </Tabs>
  );
}

