import React, { useContext, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import formStyle from './form-elements-style';
import style from './settings-style';
import {authContext, principalContext} from '../../../contexts';
import {uri} from '../../../constants';

export default function Settings() {
    const setAuth= useContext(authContext);
    const {emailNotification, setEmailNotification} = useContext(principalContext);

    const emailNotificationSettings=()=>{
        setEmailNotification(prev=> !prev);
    
        fetch(`${uri}/api/emailNotification`,{
            method:'PUT',
            headers:{"Content-type": "application/json; charset=UTF-8"},
        })
        .then(res=> res.json())
        .then(data=>{
          if(data.auth === false){
            setAuth(data.auth);
          }
          //console.log('fetch setting email');
        })
        .catch(err => console.log(err));
    }

    return (
        <View>
            <View style={style.container}>
                <Text style={[formStyle.labels,{marginRight: 30}]}>Email Notifications</Text>
                <View style={style.switchContainer}>
                    <Text style={style.text}>off/on</Text>
                    <Switch trackColor={{false: 'white', true: 'white'}}
                    thumbColor={emailNotification ? '#6700b7' : '#bababa'}
                    onValueChange={()=> emailNotificationSettings()}
                    value={emailNotification}/>
                </View>
            </View>
        </View>
    )
}
