import React, {useRef, useEffect} from 'react'
import { View,Text, Image, Animated, Easing } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import style from './loading-style';


export default function Loading() {
    const spin= useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        Animated.loop(
            Animated.timing(spin, {
                toValue:360,
                duration:1000,
                easing: Easing.linear,
                useNativeDriver:true,
                isInteraction: false
            })
        ).start();
    },[spin]);
    
    return (
        <LinearGradient colors={['#5c00aa','#ff15ec']} style={style.mainContainer}>
            <Image source={require('../../assets/img/logo1.png')} style={style.logo}/>
            <Animated.Image source={require('../../assets/img/loading.png')} 
            style={{transform:[{rotate: spin.interpolate({
                inputRange:[0, 360],
                outputRange: ['0deg','360deg']
            })}]}}/>
            <Text style={style.loading}>Loading...</Text>
        </LinearGradient>
    )
}


