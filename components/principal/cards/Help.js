import React from 'react'
import { View, Text, Image } from 'react-native';
import style from './help-style';

export default function Help() {
    return (
        <View>
            <View style={style.container}>
                <View style={style.dots} />
                <Text>Press on an event to edit it or delete it</Text>
            </View>
            <View style={style.container}>
                <View  style={style.dots}/>
                <Text>Press on <Image source={require('../../../assets/img/add.png')} style={style.icon}/> to add a new event</Text>
            </View>
            <View style={style.container}>
                <View  style={style.dots}/>
                <Text>Press on <Image source={require('../../../assets/img/search.png')} style={style.icon}/> to search an event</Text>
            </View>
            <View style={style.container}>
                <View  style={style.dots}/>
                <Text>Press on <Image source={require('../../../assets/img/settings.png')} style={style.icon}/> to edit notifications settings</Text>
            </View>
            <View style={style.container}>
                <View  style={style.dots}/>
                <Text>Press on the months icons to go to a specific month</Text>
            </View>
            <View style={style.container}>
                <View  style={style.dots}/>
                <Text>Press on <Image source={require('../../../assets/img/logout.png')} style={style.icon}/> to logout</Text>
            </View>
        </View>
    )
}
