import React, { useRef, useState, useEffect, useContext } from 'react'
import { Animated, Text, View } from 'react-native';
import Header from './Header';
import Loading from '../loading/Loading';
import Toolbar from './Toolbar';
import {useFonts, FredokaOne_400Regular} from '@expo-google-fonts/fredoka-one';
import {Roboto_700Bold} from '@expo-google-fonts/roboto'
import Card from './cards/Card';
import {principalContext, authContext} from '../../contexts';
import Calendar from './calendar/Calendar';
import style from './principal-style';
import {uri} from '../../constants';
import registerForPushNotificationsAsync from '../../registerPush';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

export default function Principal() {
    const [fontsLoaded]= useFonts({FredokaOne_400Regular, Roboto_700Bold});
    const [showCard, setShowCard]= useState('none');
    const [message, setMessage]= useState('');
    const [searchFilters, setSearchFilters]= useState({});
    const [updateCalendar, setUpdateCalendar]= useState(false);
    const [edit, setEdit]= useState({});
    const monthRef= useRef();
    const [emailNotification, setEmailNotification]= useState(true);
    const [firstFetch, setFirstFetch]= useState(true);
    const setAuth= useContext(authContext);
    const [calendarKeys, setCalendarKeys]= useState([]);

    //get email notification status and set push
    useEffect(()=>{
        if(firstFetch){
          fetch(`${uri}/api/emailNotification`,{
          method:'GET',
          headers:{"Content-type": "application/json; charset=UTF-8"},
      })
      .then(res=> res.json())
      .then(data=>{
        if(data.auth === false){
            setAuth(data.auth);
        }else{
            setEmailNotification(data.mailNotification);
            setFirstFetch(false);
            //console.log("fetch principal.js email notification");
        }
      })
      .catch(err => console.log(err));

      registerForPushNotificationsAsync();
     }
    }, [firstFetch]);


    if(!fontsLoaded){
        return (<Loading/>)
    }else{
    return (
        <principalContext.Provider value={{
            showCard,
            setShowCard,
            monthRef,
            setMessage,
            updateCalendar,
            setUpdateCalendar,
            edit,
            setEdit,
            searchFilters,
            setSearchFilters,
            emailNotification,
            setEmailNotification,
            calendarKeys,
            setCalendarKeys
        }}>
        <View style={{flex:1}}>
            <Calendar/>
                {
                    message ? 
                    (
                        <Message message={message} setMessage={setMessage} />
                    ):(null)
                }
            <Header/>
            <Card />
            <Toolbar/>
        </View>
        </principalContext.Provider>
    )
    }
}
  
const Message=({message, setMessage})=>{
    const messageOpacity= useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        if(message){
            Animated.timing(messageOpacity,{
                toValue:100,
                duration:3000,
                useNativeDriver:true
            }).start();
            setTimeout(()=>{
                setMessage('');
            }, 3000)
        }
    },[message])    

    return(
        <Animated.View style={[style.messageContainer,
         {opacity: messageOpacity.interpolate({
             inputRange:[0,10,90,100],
             outputRange:[0,1,1,0]
         })
         }]}>
            <Text style={style.messageText}>{message}</Text>
        </Animated.View> 
    )
}