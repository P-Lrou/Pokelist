<script setup>
import SetupPokedex from "@/components/SetupPokedex.vue";
import SetupShop from "@/components/SetupShop.vue";
import SetupTrade from "@/components/SetupTrade.vue";
</script>

<template>
  <img class="profilePicture" src="../assets/pokeball.png" />
  <div v-if="store.canDisplayPokedex" class="pokedexALL">
    <SetupPokedex />
  </div>
  <div v-if="store.canDisplayShop" class="shopALL">
    <SetupShop />
  </div>
  <div v-if="store.canDisplayTrade" class="tradeALL">
    <SetupTrade />
  </div>
  <footer>
    <p
      class="PageTitles"
      @click="
        (store.canDisplayTrade = true),
          (store.canDisplayPokedex = false),
          (store.canDisplayShop = false)
      "
    >
      Trade
    </p>
    <p
      class="PageTitles"
      @click="
        (store.canDisplayTrade = false),
          (store.canDisplayPokedex = true),
          (store.canDisplayShop = false)
      "
    >
      Pokédex
    </p>
    <p
      class="PageTitles"
      @click="
        (store.canDisplayTrade = false),
          (store.canDisplayPokedex = false),
          (store.canDisplayShop = true)
      "
    >
      Shop
    </p>
  </footer>
</template>

<style>
.profilePicture {
  position: fixed;
  top: 1vh;
  right: 2vw;
  width: 15vw;
}

footer {
  position: absolute;
  top: 89vh;
  display: flex;
  justify-content: space-evenly;
  width: 98vw;
}

.PageTitles {
  font-size: 7vw;
  text-align: center;
  color: white;
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
