import Constants from "expo-constants";
const { manifest } = Constants;

export const uri= `http://${manifest.debuggerHost.split(':').shift()}:4000`;

//export const uri= 'http://192.168.0.252:4000';