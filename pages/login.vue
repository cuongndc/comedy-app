<script setup lang="ts">
import useFirebase from '~/composables/useFirebase'
const { signWithGoogle, signWithFacebook } = useFirebase()
</script>

<template>
  <div
    class="flex min-h-screen flex-col text-white"
    style="background: linear-gradient(99.09deg, #ec2c00 0%, hsl(11deg 12% 11%) 100%)"
  >
    <div class="absolute-center mx-auto h-screen w-full md:w-3/4">
      <div class="flex h-[450px] w-[300px] flex-col rounded-2xl  md:h-[550px] md:w-[400px]">
        <div class="absolute-center relative my-2 flex h-[10%] w-full">
          <button class="absolute top-1/2 left-0 -translate-y-1/2 p-6 transition-all hover:scale-110">
            <NuxtLink href="/menu">
              <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" aria-hidden="true" class="h-8 w-8"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </NuxtLink>
          </button>
          <h1 class="font-secondary text-4xl">
            Đăng nhập
          </h1>
        </div>
        <div class="relative flex h-[60%] w-full flex-col items-center gap-10 pt-4">
          <button
            class="z-10 w-3/4 justify-evenly space-x-4 rounded-2xl bg-white py-4 text-black transition-all duration-300 hover:scale-95"
            @click="signWithGoogle"
          >
            <svg
              stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px"
              viewBox="0 0 48 48" enable-background="new 0 0 48 48" class="inline-block h-8 w-8" height="1em"
              width="1em" xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span>Đăng nhập với Google</span>
          </button>
          <button
            class="z-10 w-3/4 justify-evenly space-x-4 rounded-2xl bg-blue-600 py-4 transition-all duration-300 hover:scale-95"
            @click="signWithFacebook"
          >
            <svg
              stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512"
              class="inline-block h-8 w-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
              />
            </svg>
            <span>Đăng nhập với Facebook</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
