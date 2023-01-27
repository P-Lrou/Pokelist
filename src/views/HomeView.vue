<template>
  <router-link
    class="linkToProfile"
    to="/Profile"
    @click="
      (canDisplayTrade = false),
        (store.store.canDisplayPokedex = true),
        (canDisplayShop = false)
    "
    v-if="!store.canDisplayNewPokemon"
  >
    <img class="profilePicture" src="../assets/pokeball.png"
  /></router-link>
  <div v-if="store.canDisplayPokedex" class="pokedexALL">
    <SetupPokedex />
  </div>
  <div v-if="canDisplayShop" class="shopALL">
    <SetupShop />
  </div>
  <div v-if="canDisplayTrade" class="tradeALL">
    <SetupTrade />
  </div>
  <div v-if="store.canDisplayNewPokemon" class="NewPokemonALL">
    <SetupNewPokemon />
  </div>
  <footer v-if="!store.canDisplayNewPokemon">
    <p
      class="PageTitles"
      @click="
        (canDisplayTrade = true),
          (store.canDisplayPokedex = false),
          (canDisplayShop = false)
      "
    >
      <img src="../assets/Trade.png" class="TradeLogo" />
    </p>
    <p
      class="PageTitles"
      @click="
        (canDisplayTrade = false),
          (store.canDisplayPokedex = true),
          (canDisplayShop = false)
      "
    >
      <img src="../assets/Pokedex.png" class="PokedexLogo" />
    </p>
    <p
      class="PageTitles"
      @click="
        (canDisplayTrade = false),
          (store.canDisplayPokedex = false),
          (canDisplayShop = true)
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
import SetupNewPokemon from "@/components/SetupNewPokemon.vue";
import { store } from "../stores/store";
import { useGeolocation } from "@vueuse/core";
import { positionLib } from "../json/positionLib.json";
import { pokemons } from "../json/pokemons.json";

export default {
  components: {
    SetupPokedex,
    SetupShop,
    SetupTrade,
    SetupNewPokemon,
  },
  setup() {
    const { coords, locatedAt, error, resume, pause } = useGeolocation();
    return { coords, locatedAt, error, resume, pause };
  },
  data() {
    return {
      store,
      canDisplayTrade: false,
      canDisplayShop: false,
    };
  },
  methods: {
    changePostions(latitude, longitue) {
      let newLatitudeMore = latitude + (0.1 / 6378) * (180 / Math.PI);
      let newlongitueMore =
        longitue +
        ((0.5 / 6378) * (180 / Math.PI)) / Math.cos(latitude * (Math.PI / 180));
      let newLatitudeLess = latitude - (0.1 / 6378) * (180 / Math.PI);
      let newlongitueLess =
        longitue -
        ((0.5 / 6378) * (180 / Math.PI)) / Math.cos(latitude * (Math.PI / 180));
      return [
        newLatitudeMore,
        newlongitueMore,
        newLatitudeLess,
        newlongitueLess,
      ];
    },
    checkPosition() {
      setInterval(() => {
        this.resume();
        positionLib.forEach((element) => {
          let newCoords = this.changePostions(
            element.latitude,
            element.longitude
          );
          let actualDate = new Date();
          let actualHour = actualDate.getHours();
          if (
            this.coords.latitude <= newCoords[0] &&
            this.coords.longitude <= newCoords[1] &&
            this.coords.latitude >= newCoords[2] &&
            this.coords.longitude >= newCoords[3] &&
            actualHour === JSON.parse(element.hour)
          ) {
            let idArray = store.arrayWithOnlyDiscovered.map(
              (elm) => elm.pokemonID
            );
            if (!idArray.includes(element.newPokemonID)) {
              this.store.canDisplayNewPokemon = false;
              this.canDisplayTrade = false;
              this.canDisplayShop = false;
              pokemons.forEach((elm) => {
                if (element.newPokemonID === elm.pokemonID) {
                  this.pause();
                  store.newPokemonDiscover = elm;
                  store.canDisplayPokedex = false;
                  store.canDisplayNewPokemon = true;
                }
              });
            }
          }
        });
        this.pause();
      }, 5000);
    },
  },
  created() {
    this.checkPosition();
  },
};
</script>
