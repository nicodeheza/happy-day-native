import React, { useContext } from 'react'
import { View, Text, Pressable, Image } from 'react-native';
import style from './Toolbar-style';
import {authContext, principalContext} from '../../contexts';
import {uri} from '../../constants';

export default function Toolbar() {

    const setAuth= useContext(authContext);
    const {setShowCard}= useContext(principalContext);

    const logOut=()=>{
        fetch(`${uri}/api/logout`,{
            method:'GET',
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res=>res.json())
        .then(data=>{
            setAuth(data.setAuth);
            //console.log('log out fetch');
        })
        .catch(err=> console.log(err));
        
    }

    return (
        <View style={style.toolbar}>
            <Pressable onPress={()=>setShowCard('search')}>
                {
                    ({pressed})=>(
                        <Image source={require('../../assets/img/search.png')}
                        style={[style.btnImage,{opacity: pressed ? 0.5 : 1}]}/>
                    )
                }
            </Pressable>
            <Pressable onPress={()=>setShowCard('add')}>
                {
                    ({pressed})=>(
                        <Image source={require('../../assets/img/add.png')}
                        style={[style.btnImage, {opacity: pressed ? 0.5 : 1}]}/>
                    )
                }
            </Pressable>
            <Pressable onPress={()=>setShowCard('settings')}>
                {
                    ({pressed})=>(
                        <Image source={require('../../assets/img/settings.png')}
                        style={[style.btnImage, {opacity: pressed ? 0.5 : 1}]}/>
                    )
                }
            </Pressable>
            <Pressable onPress={()=>setShowCard('help')}>
                {
                    ({pressed})=>(
                        <Image source={require('../../assets/img/help.png')}
                        style={[style.btnImage, {opacity: pressed ? 0.5 : 1}]}/>
                    )
                }
            </Pressable>
            <Pressable onPress={()=>logOut()} >
                {
                    ({pressed})=>(
                        <Image source={require('../../assets/img/logout.png')}
                        style={[style.btnImage, {height:'50%'}, {opacity: pressed ? 0.5 : 1}]}/>
                    )
                }
            </Pressable>
            
        </View>
    )
}
