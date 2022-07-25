import {initializeApp, getApps} from "firebase/app";
import useFirebase from '~/composables/useFirebase'

export default defineNuxtPlugin(async (nuxtApp) => {
    const {initFirebase} = useFirebase();
    const firebaseConfig = {
        apiKey: "AIzaSyBATH9PLhD14TgQWd73dNhd9SJu8FqKhbc",
        authDomain: "comedy-app-d016f.firebaseapp.com",
        projectId: "comedy-app-d016f",
        storageBucket: "comedy-app-d016f.appspot.com",
        messagingSenderId: "903352519589",
        appId: "1:903352519589:web:e15211449cc0b7c931b64c",
        measurementId: "G-XRJ0JDNEGY"
    };


    try {
        const apps = getApps();
        const app = !apps.length ? initializeApp(firebaseConfig) : apps[0];
        initFirebase()
    } catch (e) {
        console.log('err', e);
    }
})