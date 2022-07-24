<script setup>
</script>

<template>
  <div class="tabbar__Root-sc-12f1jh8-0 ijMLwP">
    <div class="flex items-center justify-around w-full">
      <NuxtLink to="/" title="Cá nhân">
        <div class="flex flex-col items-center">
          <SvgUser class="w-[30px]"/>
          <span class="text-base text-primary-gray">Truyện tranh</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/menu" title="Cá nhân">
        <div class="flex flex-col items-center">
          <SvgUser/>
          <span class="text-base text-primary-gray">Cá nhân</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
footer .link-footer ul li {
  margin: 0 6px 0 0;
  line-height: 38px;
  list-style: none;
  display: inline-block;
}

footer .link-footer ul li a {
  border: solid 1px #ddd;
  padding: 6px;
  white-space: nowrap;
  border-radius: 4px;
  color: #fff;
}


.ijMLwP {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  width: 100%;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 20px;
}
</style>