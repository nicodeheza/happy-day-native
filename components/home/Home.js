import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";
import style from "./Home-style";
import Form from "./Form";
import Loading from "../loading/Loading";
import Recover from "./Recover";

export default function Home() {
  let [fontsLoaded] = useFonts({ Roboto_700Bold, FredokaOne_400Regular });
  const [showRecover, setShowRecover] = useState(false);
  const [avoid, setAvoid] = useState(false);
  if (!fontsLoaded) {
    return <Loading />;
  } else {
    return (
      <KeyboardAvoidingView
        style={style.KeyboardAvoidingView}
        behavior="position"
        enabled={avoid}
      >
        <StatusBar backgroundColor="#61dafb" barStyle={"dark-content"} />
        <View style={style.mainContainer}>
          {showRecover ? <Recover setShowRecover={setShowRecover} /> : null}
          <View style={style.header}>
            <ImageBackground
              source={require("../../assets/img/header.png")}
              style={style.backgroundImageContainer}
              imageStyle={style.backgroundImage}
            >
              <Image
                source={require("../../assets/img/logo1.png")}
                style={style.logo}
              />
              <Text style={style.hederText}>
                Birthdays and Anniversaries Reminder
              </Text>
            </ImageBackground>
          </View>
          <Form setAvoid={setAvoid} />
          <View style={style.footer}>
            <ImageBackground
              source={require("../../assets/img/footer.png")}
              style={style.footerBkImage}
              imageStyle={style.backgroundImage}
            >
              <View style={style.footerTextContainer}>
                <Text style={style.footerText}>Forgot Your Password?</Text>
                <Text
                  style={[{ color: "red", marginLeft: 5 }, style.footerText]}
                  onPress={() => setShowRecover(true)}
                >
                  Recover it
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
