import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { monthColors, abrMonths } from "../../constants";
import style from "./Header-style";
import {principalContext} from '../../contexts';

function getMonthObject(monthColors, abrMonths) {
  let month = [];
  for (let i = 0; i < abrMonths.length; i++) {
    month.push({ abr: abrMonths[i], color: monthColors[i] });
  }
  return month;
}
const month = getMonthObject(monthColors, abrMonths);

const MonthBtn = ({ abr, color, onPress, onPressOut, lineColor, index }) => {
    const {monthRef, setMessage, calendarKeys}= useContext(principalContext);
    const monthNum= (index + 1).toString();

    const scrollTo=()=>{
      if (monthRef.current){
        const activesMonths= calendarKeys
        const getIndex=  activesMonths.indexOf(monthNum);
   
        if(getIndex >= 0){
          monthRef.current.scrollToIndex({index: getIndex , animated: true, viewPosition: 0.5}); 
        }else{
          //console.log('none');
          setMessage("You don't have events this month");
        }
      }else{
        setMessage("You don't have events");
      }
    }
  return (
    <Pressable
      style={style.monthBtnPress}
      onPressIn={onPress}
      onPressOut={onPressOut}
      onPress={()=> scrollTo() }
    >
      <View
        style={[
          {
            backgroundColor: color,
            borderColor: lineColor,
          },
          style.monthBtnContainer,
        ]}
      >
        <Text style={[style.btnText, { color: lineColor }]}>{abr}</Text>
      </View>
    </Pressable>
  );
};

export default function Header() {
  const [btnPressed, setBtnPressed] = useState(null);

  const renderBtn = ({ item, index }) => {
    const lineColor = item.abr === btnPressed ? "#6700b7" : "white";
    return (
      <MonthBtn
        abr={item.abr}
        lineColor={lineColor}
        color={item.color}
        onPress={() => setBtnPressed(item.abr)}
        onPressOut={() => setBtnPressed(null)}
        index={index}
      />
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/img/header.png")}
      style={style.imgBckContainer}
      imageStyle={style.imgBckImage}
    >
      <Image
        source={require("../../assets/img/logo2.png")}
        style={style.logo}
      />
      <FlatList
        data={month}
        renderItem={renderBtn}
        keyExtractor={(item) => item.abr}
        horizontal={true}
      />
    </ImageBackground>
  );
}


