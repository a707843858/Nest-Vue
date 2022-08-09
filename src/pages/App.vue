<template>
  <div @click="clickHandle">
    App
  </div>
</template>

<script setup>
const clickHandle = () => {
  console.log("click");
};

</script>
