import React from 'react'
import { View, Text, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default function Btn({text, submit, width, height}) {
    return (
        <Pressable onPress={submit}>
        {
            ({pressed})=>
                pressed ?
                (
                    <View style={[{backgroundColor:'#5c00aa'},{
                        borderRadius:20,
                        alignItems: 'center',
                        justifyContent:'center',
                        width: width,
                        height: height
                    }]}>
                        <Text style={{
                             fontFamily: 'Roboto_700Bold',
                             color: '#f9e385',
                             fontSize: height /3
                        }}>{text}</Text>
                    </View>
                ) :
                (
                    <LinearGradient colors={['#ff15ec','#5c00aa']} style={{
                        borderRadius:20,
                        alignItems: 'center',
                        justifyContent:'center',
                        width: width,
                        height: height
                    }}>
                        <Text style={{
                             fontFamily: 'Roboto_700Bold',
                             color: '#f9e385',
                             fontSize: height /3
                        }}>{text}</Text>
                    </LinearGradient>
                )
        }
    </Pressable>
    )
}