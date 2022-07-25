<script setup lang="ts">
import {ArrowNarrowRightIcon} from "@heroicons/vue/outline";
import {onAuthStateChanged, getAuth} from '@firebase/auth'
import {watchEffect} from "vue";

const userInfo = ref({})
const isLoggedIn = ref(false)

const doLogout = async () => {
  const auth = getAuth();
  await auth.signOut();
  isLoggedIn.value = false;
  userInfo.value = null;
}
const doRedirectLoginPage = () => {
  return navigateTo("/login");
}

watchEffect(() => {
  try {
    onAuthStateChanged(getAuth(), (user) => {
      userInfo.value = user;
      isLoggedIn.value = true
    })
  } catch (e) {

  }

})
</script>

<template>
  <NuxtLayout name="menu">
    <div class="dqMZqX" v-if="!isLoggedIn">
      <div class="h-[90px] mr-5">
        <SharedImg src="/images/img-avatar.png"/>
      </div>
      <div class="info">
        <p>Để theo dõi nhiều truyện hay!</p>
        <button @click="doRedirectLoginPage" class="btn bg-primary flex items-center rounded-3xl">
          <span>Đăng nhập ngay</span>
          <ArrowNarrowRightIcon class="w-5 h-5 ml-2"/>
        </button>
      </div>
    </div>
    <div v-if="isLoggedIn">
      <div class="h-[90px] mr-5 flex items-end">
        <SharedImg class="w-[50px]" :src="userInfo?.photoURL"/>
        <div class="info ml-3">
          <span>Hi:</span>
          <b>{{ userInfo?.displayName }}</b>
        </div>
      </div>
      <button @click="doLogout">
        Đăng xuất
      </button>
    </div>
  </NuxtLayout>
</template>