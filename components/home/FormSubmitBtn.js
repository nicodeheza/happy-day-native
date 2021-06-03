import React from 'react'
import { View, Text, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import style from './Form-style';

export default function FormSubmitBtn({text, submit}) {
    return (
        <Pressable onPress={submit}>
        {
            ({pressed})=>
                pressed ?
                (
                    <View style={[{backgroundColor:'#5c00aa'}, style.btnBackground]}>
                        <Text style={style.btnText}>{text}</Text>
                    </View>
                ) :
                (
                    <LinearGradient colors={['#ff15ec','#5c00aa']} style={style.btnBackground}>
                        <Text style={style.btnText}>{text}</Text>
                    </LinearGradient>
                )
        }
    </Pressable>
    )
}
