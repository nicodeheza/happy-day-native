import React from 'react'
import { Text, View } from 'react-native';
import Header from './Header';
import Loading from '../loading/Loading'
import {useFonts, FredokaOne_400Regular} from '@expo-google-fonts/fredoka-one';

export default function Principal() {
    const [fontsLoaded]= useFonts({FredokaOne_400Regular});

    if(!fontsLoaded){
        return (<Loading/>)
    }else{
    return (
        <View style={{flex:1}}>
            <Header/>
        </View>
    )
    }
}
