<template>
  <img src="../assets/MainTitleShop.png" class="MainTitleShop" />
  <div class="shop">
    <div
      class="pokemonShop"
      v-for="newPokemons in store.userShop"
      :key="newPokemons.pokemonID"
      :class="newPokemons.pokemonID"
      :style="{
        'background-image': `url(${newPokemons.pokemonImg})`,
        filter: `grayscale(${newPokemons.pokemonGrayScale})`,
      }"
      @click="checkIfCanDisplay(newPokemons)"
    >
      <div class="priceShop">{{ newPokemons.price }} coins</div>
    </div>
  </div>
  <p class="coinsNumberShop">
    Coins Number : {{ store.acutalUserDatas.userCoins }}
  </p>
  <PokemonCard
    :actual-pokemon="selectedPokemon"
    :can-display-price="canDisplayPrice"
    v-model:can-display="canDisplayPokemonCard"
  />
</template>

<style>
.MainTitleShop {
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 8vh;
  width: 40vw;
}

.shop {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 10vh;
}

.pokemonShop {
  position: relative;
  display: block;
  width: 25vw;
  height: 25vw;
  margin: 1vw;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.2);
  border: solid black;
  margin-bottom: 10vh;
}

.priceShop {
  position: relative;
  font-size: 5vw;
  text-align: center;
  color: gold;
  margin-top: 12vh;
}

.coinsNumberShop {
  position: relative;
  text-align: end;
  font-size: 6vw;
  margin-bottom: 10vh;
  color: gold;
}
</style>

<script>
import { store } from "../stores/store";
import PokemonCard from "../components/PokemonCard.vue";

export default {
  components: {
    PokemonCard,
  },
  data() {
    return {
      store,
      selectedPokemon: {},
      canDisplayPokemonCard: false,
      canDisplayPrice: false,
    };
  },
  created() {
    store.checkIfShopNeedReset();
    store.doShopInit();
  },
  methods: {
    checkIfCanDisplay(newPokemons) {
      if (newPokemons.pokemonGrayScale === "0") {
        this.selectedPokemon = newPokemons;
        this.canDisplayPokemonCard = true;
        this.canDisplayPrice = true;
      }
    },
  },
};
</script>
