import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated, Pressable, Easing, Keyboard } from 'react-native';
import Help from './Help';
import Search from './Search';
import Add from './Add';
import Settings from './Settings';
import style from './card-style';
import {principalContext} from '../../../contexts';
import Edit from './Edit';

export default function Card() {
    const {showCard, setShowCard}= useContext(principalContext);
    const [cardHeight, setCardHeight]= useState(9000);
    const [cardOpen, setCardOpen]= useState(false);
    const [title, setTitle]= useState(null);
    const [cardContent, setCardContent]= useState(null);
    const cardPos= useRef(new Animated.Value(0)).current;
    const time= 500;

    const open=()=>{
        switchForm(showCard);
        Animated.timing(cardPos, {
            toValue:1,
            duration: time,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start();
            setCardOpen(true);
    }
    const close=()=>{
        Animated.timing(cardPos,{
            toValue:0,
            duration: time,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease)
        }).start();
            setCardOpen(false);
            Keyboard.dismiss();
    }
    const closeOpen=()=>{
        Animated.timing(cardPos,{
            toValue:0,
            duration: time,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease)
        }).start(()=> open());
    }

    useEffect(()=>{
        if(showCard !=='none' && cardOpen === false ){
            open();
        }else if(showCard === 'none' && cardOpen === true){
            close();
        }else if( cardOpen === true && showCard !== 'none'){
            closeOpen();
        }
    },[showCard]);

    const switchForm=(sc)=>{
        switch(sc){
            case 'search':
                setTitle('Search Event')
                setCardContent(<Search/>);
                    break;
            case 'add':
                setTitle('Add Event');
                setCardContent(<Add/>);
                    break;
            case 'settings':
                setTitle('Settings');
                setCardContent(<Settings/>);
                    break;
            case 'help':
                setTitle('Help');
                setCardContent(<Help/>);
                    break;
            case 'edit':
                setTitle('Edit Event');
                setCardContent(<Edit/>)
            default:
                break;
        }
    }

    return (
        <Animated.View onLayout={(e)=> setCardHeight(e.nativeEvent.layout.height)} 
        style={[style.card, {transform:[{translateY: cardPos.interpolate({
            inputRange: [0,1],
            outputRange:[cardHeight * 2, 0]
        })}] }]}>
            <View style={style.header}>
                <Text style={style.title}>{title}</Text>
                <Pressable onPress={()=>setShowCard('none')} style={({pressed})=>[{opacity: pressed ? 0.5 : 1}]}>
                <Image source={require('../../../assets/img/exit.png')} />
                </Pressable>
            </View>
            {cardContent}
        </Animated.View>
    )
}
