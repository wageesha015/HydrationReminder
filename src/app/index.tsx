
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function ReminderTab() {

  const [isReminding, setIsReminding] = useState(false);

  const [message, setMessage] = useState(
    'Time to drink a glass of water!'
  );

  const [intervalMinutes, setIntervalMinutes] = useState('1');

  
  useEffect(() => {
    async function requestPermissions() {

      const { status } =
        await Notifications.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need notification permission to remind you to drink water!'
        );
      }
    }

    requestPermissions();
  }, []);

  
  async function scheduleReminder() {

    const minutes = Number(intervalMinutes);

    if (!Number.isInteger(minutes) || minutes < 1) {
      Alert.alert('Invalid Interval', 'Enter a valid interval.');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Empty Message', 'Enter a reminder message.');
      return;
    }

    
    const { status } =
      await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Please allow notifications in phone settings.'
      );
      return;
    }

    
    await Notifications.cancelAllScheduledNotificationsAsync();

    
    await Notifications.scheduleNotificationAsync({

      content: {
        title: '💧 Hydration Alert!',
        body: message,
        sound: true,
      },

      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: minutes * 60,
        repeats: true,
      },

    });

    setIsReminding(true);

    Alert.alert(
      'Set!',
      `Reminding you every ${minutes} minutes.`
    );
  }

  
  async function stopReminder() {

    await Notifications.cancelAllScheduledNotificationsAsync();

    setIsReminding(false);

    Alert.alert(
      'Stopped',
      'Reminders cancelled.'
    );
  }

  
  return (
    <View style={styles.container}>

      <Text style={styles.emoji}>🥤</Text>

      <Text style={styles.label}>
        Add a Custom Message
      </Text>

      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Enter reminder message"
      />

      <Text style={styles.label}>
        Set Interval (minutes)
      </Text>

      <TextInput
        style={styles.input}
        value={intervalMinutes}
        onChangeText={setIntervalMinutes}
        keyboardType="numeric"
        placeholder="Enter minutes"
      />

      <Text style={styles.status}>
        Status: {isReminding ? 'Active 🟢' : 'Inactive 🔴'}
      </Text>

      <View style={styles.button}>
        <Button
          title="START REMINDERS"
          onPress={scheduleReminder}
          color="#0EA5E9"
        />
      </View>

      <View style={{ height: 10 }} />

      <View style={styles.button}>
        <Button
          title="STOP REMINDERS"
          onPress={stopReminder}
          color="#EF4444"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  emoji: {
    fontSize: 65,
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  input: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#B0BEC5',
  },

  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  button: {
    width: '80%',
  },

});

