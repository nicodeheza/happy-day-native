import React from 'react'
import { View, Text, Pressable, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default function DropBtn({submit, width, height}) {
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
                         <Image source={require('../../../assets/img/dropBig.png')}
                        style={{resizeMode:'contain', width:25, height:25}} />
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
                        <Image source={require('../../../assets/img/dropBig.png')}
                        style={{resizeMode:'contain', width:25, height:25}} />
                    </LinearGradient>
                )
        }
    </Pressable>
    )
}