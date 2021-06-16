import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {uri} from './constants';

export default registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      fetch(`${uri}/api/expoToken`,{
        method: "POST",
        body: JSON.stringify({token: token}),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then(res=> res.json())
      .then(data=>{
          console.log(data);
      }).catch(err=>console.log(err));
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    };