<template>
  <router-link
    class="linkToProfile"
    to="/Profile"
    @click="
      (store.canDisplayTrade = false),
        (store.canDisplayPokedex = true),
        (store.canDisplayShop = false)
    "
  >
    <img class="profilePicture" src="../assets/pokeball.png"
  /></router-link>
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
      <img src="../assets/Trade.png" class="TradeLogo" />
    </p>
    <p
      class="PageTitles"
      @click="
        (store.canDisplayTrade = false),
          (store.canDisplayPokedex = true),
          (store.canDisplayShop = false)
      "
    >
      <img src="../assets/Pokedex.png" class="PokedexLogo" />
    </p>
    <p
      class="PageTitles"
      @click="
        (store.canDisplayTrade = false),
          (store.canDisplayPokedex = false),
          (store.canDisplayShop = true)
      "
    >
      <img src="../assets/Shop.png" class="ShopLogo" />
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
  top: 88vh;
  left: 0vw;
  display: flex;
  justify-content: space-evenly;
  width: 98vw;
  height: 10vh;
}

.PageTitles {
  font-size: 7vw;
  text-align: center;
  color: white;
}
</style>

<script>
import SetupPokedex from "@/components/SetupPokedex.vue";
import SetupShop from "@/components/SetupShop.vue";
import SetupTrade from "@/components/SetupTrade.vue";
import { store } from "../stores/store";
import { useGeolocation } from "@vueuse/core";

export default {
  components: {
    SetupPokedex,
    SetupShop,
    SetupTrade,
  },
  setup() {
    const { coords, locatedAt, error, resume, pause } = useGeolocation();
    return { coords, locatedAt, error, resume, pause };
  },
  data() {
    return {
      store,
    };
  },
  created() {
    console.log(this.coords);
  },
};
</script>
