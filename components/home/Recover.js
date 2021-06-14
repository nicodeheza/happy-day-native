import React, { useState } from "react";
import { View, Text, TextInput, Image, Pressable } from "react-native";
import FormSubmitBtn from "./FormSubmitBtn";
import style from "./recover-style";
import {uri} from '../../constants';

export default function Recover({ setShowRecover }) {
    const [email, setEmail]=useState('');
    const [message, setMessage]= useState('');

    const handelSubmit=()=>{
        if(!email || /[\w]@[\w]/.test(email) === false){
            setMessage('Enter an email');
        }else {
            setMessage('Loading...');
            fetch(`${uri}/recover`,{
                method:'POST',
                body: JSON.stringify({email}),
                headers:{"Content-type": "application/json; charset=UTF-8"},
            })
            .then(res=>res.json())
            .then(data=>{
                setMessage(data.message);
                //console.log('recover fetch');
            })
            .catch(err=>console.log(err));
            //console.log(email)
            setEmail('');
        }
    }
    
  return (
    <View style={style.mainContainer}>
      <View style={style.container}>
        <Pressable onPress={() => setShowRecover(false)} style={style.close}>
          <Image source={require("../../assets/img/exit.png")} style={style.closeImg}/>
        </Pressable>
        <Text style={style.title}>Enter your email to recover your password</Text>
        <TextInput placeholder="Email" style={style.input} 
         value={email}
         onChangeText={text=>setEmail(text)}
         autoCompleteType="email"
         keyboardType="email-address"
         textContentType="emailAddress"/>
        <View style={style.btnContainer} >
        <Text style={{color:'red'}}>{message}</Text>
        <FormSubmitBtn text={"Submit"} submit={handelSubmit} />
        </View>
        <Text>
          You are going to receive an email with a link to recover your
          password, this link is valid for 24hs.
        </Text>
      </View>
    </View>
  );
}
