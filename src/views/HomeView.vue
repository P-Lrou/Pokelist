<script setup>
import SetupPokedex from "@/components/SetupPokedex.vue";
</script>

<template>
  <img class="profilePicture" src="../assets/pokeball.png" />
  <SetupPokedex />
</template>

<style>
.profilePicture {
  position: fixed;
  top: 1vh;
  right: 2vw;
  width: 15vw;
}
</style>

<script>
import { store } from "../stores/store";

export default {
  data() {
    return {
      store,
    };
  },
};
</script>
