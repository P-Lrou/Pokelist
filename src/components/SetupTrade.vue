<template>
  <div class="tradindPost" v-if="canDisplayTradingPage">
    <img
      src="../assets/MainTitleTradingpost.png"
      class="MainTitleTradingpost"
    />
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
    <button
      class="addToTrade"
      @click="
        (canDisplayTradingPage = false), (canDisplayTradingChoicePage = true)
      "
    >
      Add To trade
    </button>
    <p class="coinsNumberTrade">
      Coins Number : {{ store.acutalUserDatas.userCoins }}
    </p>
  </div>
  <div class="TradingChoicePage" v-if="canDisplayTradingChoicePage">
    <h1 class="titleForChoose">Choose a Pokemon to Trade</h1>
    <div class="tradeChoice">
      <div
        class="pokemonTradeChoice"
        v-for="newPokemons in store.arrayWithOnlyDiscovered"
        :key="newPokemons.pokemonID"
        :class="newPokemons.pokemonID"
        :style="{
          'background-image': `url(${newPokemons.pokemonImg})`,
          filter: `grayscale(0)`,
        }"
        @click="checkIfCanDisplayTradeChoice(newPokemons)"
      ></div>
    </div>
    <button
      class="addToTrade"
      @click="
        (canDisplayTradingPage = true), (canDisplayTradingChoicePage = false)
      "
    >
      Back To TradingPost
    </button>
  </div>
  <PokemonCard
    :actual-pokemon="selectedPokemon"
    :can-display-trade="canDisplayPriceTrade"
    :can-display-trade-choice="canDisplayTradingChoicePage"
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
  max-height: 57vh;
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
  margin-bottom: 5vh;
}

.priceTrade {
  position: relative;
  font-size: 5vw;
  text-align: center;
  color: gold;
  margin-top: 12vh;
}

.coinsNumberTrade {
  position: absolute;
  top: 80vh;
  right: 5vw;
  font-size: 6vw;
  color: gold;
  margin-bottom: 10vh;
}

.addToTrade {
  position: absolute;
  top: 82.5vh;
  left: 5vw;
  font-size: 4vw;
  padding: 2vw;
  background-color: transparent;
  color: white;
  border: solid white;
  border-radius: 2vw;
}

.titleForChoose {
  color: white;
  margin-top: 8vh;
  text-align: center;
}

.tradeChoice {
  position: relative;
  max-height: 60vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-left: 5vw;
  margin-right: 5vw;
  overflow-y: scroll;
}

.pokemonTradeChoice {
  position: relative;
  display: block;
  width: 25vw;
  height: 25vw;
  margin: 1vw;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.2);
  border: solid black;
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
      canDisplayTradingPage: true,
      canDisplayTradingChoicePage: false,
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
    checkIfCanDisplayTradeChoice(newPokemons) {
      this.selectedPokemon = newPokemons;
      this.canDisplayPokemonCard = true;
      this.canDisplayTradingChoicePage = true;
      this.canDisplayPriceTrade = false;
    },
  },
};
</script>
