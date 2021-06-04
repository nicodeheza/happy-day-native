import React, { useState } from "react";
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

function getMonthObject(monthColors, abrMonths) {
  let month = [];
  for (let i = 0; i < abrMonths.length; i++) {
    month.push({ abr: abrMonths[i], color: monthColors[i] });
  }
  return month;
}
const month = getMonthObject(monthColors, abrMonths);

const MonthBtn = ({ abr, color, onPress, onPressOut, lineColor }) => {
  return (
    <Pressable
      style={style.monthBtnPress}
      onPressIn={onPress}
      onPressOut={onPressOut}
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

  const renderBtn = ({ item }) => {
    const lineColor = item.abr === btnPressed ? "#6700b7" : "white";
    return (
      <MonthBtn
        abr={item.abr}
        lineColor={lineColor}
        color={item.color}
        onPress={() => setBtnPressed(item.abr)}
        onPressOut={() => setBtnPressed(null)}
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
