<script setup>
import SetupPokedex from "@/components/SetupPokedex.vue";
</script>

<template>
  <h1>HOME PAGE</h1>
  <SetupPokedex />
</template>

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
