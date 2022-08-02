<script setup>
defineProps({
  className: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="flex w-full bg-black h-full fixed z-50">
    <svg
      class="w-[65px] lg:w-[85px]" :class="className" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px"
      viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
    >
      <circle cx="84" cy="50" r="10" fill="#3affff">
        <animate
          attributeName="r" repeatCount="indefinite" dur="0.4464285714285714s" calcMode="spline" keyTimes="0;1"
          values="10;0" keySplines="0 0.5 0.5 1" begin="0s"
        />
        <animate
          attributeName="fill" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1" values="#831a19;#831a19;#831a19;#831a19;#831a19" begin="0s"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill="#831a19">
        <animate
          attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"
        />
        <animate
          attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"
        />
      </circle>
      <circle cx="50" cy="50" r="10" fill="#52ff3a">
        <animate
          attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.4464285714285714s"
        />
        <animate
          attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.4464285714285714s"
        />
      </circle>
      <circle cx="84" cy="50" r="10" fill="#de3aff">
        <animate
          attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.8928571428571428s"
        />
        <animate
          attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.8928571428571428s"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill="#ceb109">
        <animate
          attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.3392857142857142s"
        />
        <animate
          attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.3392857142857142s"
        />
      </circle>
    </svg>
  </div>
</template>
