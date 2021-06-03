import React, { useContext, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import style from "./Form-style";
import FormSubmitBtn from "./FormSubmitBtn";
import { authContext } from "../../authContext";
import { uri } from "../../constants";

export default function Form({ setAvoid }) {
  const setAuth = useContext(authContext);
  //const setAuth= (e)=>{console.log(e)}
  const [date, setDate] = useState(new Date());
  const [showDatePiker, setShowDatePiker] = useState(false);

  const [formType, setFormType] = useState("logIn");
  const [logInFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const [singUpFields, setSingUpFields] = useState({
    email: "",
    name: "",
    birthday: "",
    password: "",
    confirm: "",
  });
  const [singUpMessage, setSingUpMessage] = useState("");
  const [logInMessage, setLogInMessage] = useState("");

  const onChangeDate = (e, selectDate) => {
    setShowDatePiker(false);
    const currentDate = selectDate || date;
    setDate(currentDate);
    setSingUpFields({
      ...singUpFields,
      birthday: `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`,
    });
  };

  const handelSingUp = () => {
    if (
      !singUpFields.email ||
      !singUpFields.name ||
      !singUpFields.birthday ||
      !singUpFields.password ||
      !singUpFields.confirm
    ) {
      setSingUpMessage("All fields are required");
    } else if (singUpFields.password !== singUpFields.confirm) {
      setSingUpMessage("Passwords don't match");
    } else if (/[\w]@[\w]/.test(singUpFields.email) === false) {
      setSingUpMessage("Enter an email");
    } else {
      setSingUpMessage("");
      //console.log('sing up');
      //console.log(singUpFields);
      const send = {
        email: singUpFields.email,
        name: singUpFields.name,
        birthday: singUpFields.birthday,
        password: singUpFields.password,
      };
      fetch(`${uri}/api/singup`, {
        method: "POST",
        body: JSON.stringify(send),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setSingUpMessage(data.message);
          } else {
            setAuth(data.auth);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handelLogIn = () => {
    if (!logInFields.password || !logInFields.email) {
      setLogInMessage("All fields are required");
    } else if (/[\w]@[\w]/.test(logInFields.email) === false) {
      setLogInMessage("Enter an email");
    } else {
      //console.log("Log In");
      //console.log(logInFields);
      setLogInMessage("");
      const send = {
        email: logInFields.email,
        password: logInFields.password,
      };
      console.log(send);
      fetch(`${uri}/api/login`, {
        method: "POST",
        body: JSON.stringify(send),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => {
          if (res.status === 401) {
            setLogInMessage("The email address or password is incorrect.");
          } else {
            res.json();
          }
        })
        .then((data) => {
          console.log(data);
          if (data) {
            console.log("log in");
            setAuth(data.auth);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={style.mainContainer}>
      {formType === "logIn" ? (
        <View style={style.container}>
          <TextInput
            placeholder="Enter Your Email"
            value={logInFields.email}
            onChangeText={(text) =>
              setLoginFields({ ...logInFields, email: text })
            }
            style={style.inputs}
            onFocus={() => setAvoid(false)}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <TextInput
            placeholder="Enter Your Password"
            value={logInFields.password}
            onChangeText={(text) =>
              setLoginFields({ ...logInFields, password: text })
            }
            style={style.inputs}
            onFocus={() => setAvoid(false)}
            autoCompleteType="password"
            secureTextEntry={true}
            textContentType="password"
          />
          <Text style={style.message}>{logInMessage}</Text>
          <FormSubmitBtn text={"Log In"} submit={handelLogIn} />
        </View>
      ) : (
        <View style={style.container}>
          <TextInput
            placeholder="Enter Your Email"
            value={singUpFields.email}
            onChangeText={(text) =>
              setSingUpFields({ ...singUpFields, email: text })
            }
            style={style.inputs}
            onFocus={() => setAvoid(false)}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <TextInput
            placeholder="Enter Your Name"
            value={singUpFields.name}
            onChangeText={(text) =>
              setSingUpFields({ ...singUpFields, name: text })
            }
            onFocus={() => setAvoid(false)}
            style={style.inputs}
          />
          <Pressable
            style={{ width: "100%", alignItems: "center" }}
            onPress={() => setShowDatePiker(true)}
          >
            {singUpFields.birthday === "" ? (
              <Text
                style={[
                  style.inputs,
                  { textAlignVertical: "center", color: "#969696" },
                ]}
              >
                Enter Your Birthday
              </Text>
            ) : (
              <Text
                style={[
                  style.inputs,
                  { textAlignVertical: "center", color: "black" },
                ]}
              >
                {singUpFields.birthday}
              </Text>
            )}
          </Pressable>
          <TextInput
            placeholder="Enter Your Password"
            value={singUpFields.password}
            onChangeText={(text) =>
              setSingUpFields({ ...singUpFields, password: text })
            }
            style={style.inputs}
            onFocus={() => setAvoid(true)}
            autoCompleteType="password"
            secureTextEntry={true}
            textContentType="password"
          />
          <TextInput
            placeholder="Enter Your Password"
            value={singUpFields.confirm}
            onChangeText={(text) =>
              setSingUpFields({ ...singUpFields, confirm: text })
            }
            style={style.inputs}
            onFocus={() => setAvoid(true)}
            autoCompleteType="password"
            secureTextEntry={true}
            textContentType="password"
          />
          <Text style={style.message}>{singUpMessage}</Text>
          <FormSubmitBtn text={"Sing Up"} submit={handelSingUp} />
        </View>
      )}

      <Text style={style.or}>or</Text>
      <Text
        style={style.switch}
        onPress={() =>
          formType === "logIn" ? setFormType("singUp") : setFormType("logIn")
        }
      >
        {formType === "logIn" ? "Sing Up" : "Log In"}
      </Text>
      {showDatePiker ? (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={"default"}
          onChange={onChangeDate}
        />
      ) : null}
    </View>
  );
}
