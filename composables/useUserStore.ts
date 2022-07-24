import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "@firebase/auth";

interface UserInfo {
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: string;
  providerId: string;
  uid: string;
}

export const useUserStore = defineStore("users", () => {
  const isLoggedIn = ref(false);
  const userInfo = ref<UserInfo>({
    displayName: "",
    email: "",
    photoURL: "",
    phoneNumber: "",
    providerId: "",
    uid: "",
  });

  const setIsLoggedIn = (logged: boolean) => {
    isLoggedIn.value = logged;
  };

  const setUserInfo = (info: any) => {
    userInfo.value = info;
  };

  return {
    userInfo,
    isLoggedIn,
    setUserInfo,
    setIsLoggedIn,
    // signWithGoogle,
    // signWithFacebook,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
