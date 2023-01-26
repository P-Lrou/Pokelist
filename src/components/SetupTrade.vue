<template>
  <img src="../assets/MainTitleTradingpost.png" class="MainTitleTradingpost" />
  <div class="trade">
    <div
      class="pokemonTrade"
      v-for="newPokemons in store.arrayTrade"
      :key="newPokemons.pokemonID"
      :class="newPokemons.pokemonID"
      :style="{
        'background-image': `url(${newPokemons.pokemonImg})`,
        filter: `grayscale(${newPokemons.pokemonGrayScale})`,
      }"
      @click="checkIfCanDisplay(newPokemons)"
    >
      <div class="priceTrade">{{ newPokemons.tradePrice }} coins</div>
    </div>
  </div>
  <p class="coinsNumberTrade">
    Coins Number : {{ store.acutalUserDatas.userCoins }}
  </p>
  <PokemonCard
    :actual-pokemon="selectedPokemon"
    :can-display-trade="canDisplayPriceTrade"
    v-model:can-display="canDisplayPokemonCard"
  />
</template>

<style>
.MainTitleTradingpost {
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 8vh;
  width: 90vw;
}

.trade {
  position: relative;
  height: 57vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-left: 5vw;
  margin-right: 5vw;
  overflow-y: scroll;
}

.pokemonTrade {
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

.priceTrade {
  position: relative;
  font-size: 5vw;
  text-align: center;
  color: gold;
  margin-top: 12vh;
}

.coinsNumberTrade {
  position: relative;
  text-align: end;
  font-size: 6vw;
  color: gold;
  margin-bottom: 10vh;
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
      canDisplayPriceTrade: false,
    };
  },
  created() {
    store.doTradeInit();
  },
  methods: {
    checkIfCanDisplay(newPokemons) {
      if (newPokemons.pokemonGrayScale === "0") {
        this.selectedPokemon = newPokemons;
        this.canDisplayPokemonCard = true;
        this.canDisplayPriceTrade = true;
      }
    },
  },
};
</script>
