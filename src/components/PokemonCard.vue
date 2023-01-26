<template>
  <div class="cardPokemon" v-if="canDisplay">
    <img
      class="crossCard"
      src="../assets/cross_white.svg"
      @click="$emit('update:canDisplay', false)"
    />
    <p class="cardPokemonName">{{ actualPokemon.pokemonName }}</p>
    <img class="actualPokemonImage" :src="actualPokemon.pokemonImg" />
    <p>ID : {{ actualPokemon.pokemonID }}</p>
    <p>Type(s) : {{ actualPokemon.pokemomonType }}</p>
    <p>Price : {{ actualPokemon.price }}</p>
    <div v-if="canDisplayPrice" class="buy">
      <p class="priceQuestion">
        Would you like to buy this Pokemon for {{ actualPokemon.price }} coins ?
      </p>
      <button
        @click="buyPokemon(actualPokemon), $emit('update:canDisplay', false)"
      >
        Yes
      </button>
      <button @click="$emit('update:canDisplay', false)">No</button>
    </div>
    <div v-if="canDisplayTrade" class="buy">
      <p class="priceQuestion">
        Would you like to trade this Pokemon for
        {{ actualPokemon.tradePrice }} coins ?
      </p>
      <button
        @click="tradePokemon(actualPokemon), $emit('update:canDisplay', false)"
      >
        Yes
      </button>
      <button @click="$emit('update:canDisplay', false)">No</button>
    </div>
    <div v-if="canDisplayTradeChoice" class="buy">
      <p class="priceQuestion">
        Would you like to put one the trade shop this Pokemon for
        {{ actualPokemon.tradePrice }} coins ?
      </p>
      <button
        @click="
          addToTradePokemon(actualPokemon), $emit('update:canDisplay', false)
        "
      >
        Trade
      </button>
    </div>
  </div>
</template>

<style>
.cardPokemon {
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.9);
  width: 80vw;
  height: 70vh;
  top: 15vh;
  left: 10vw;
  color: white;
}

.crossCard {
  position: absolute;
  right: 2vw;
  top: 2vw;
  width: 10vw;
}

.cardPokemonName {
  font-size: 8vw;
  text-align: center;
}

.actualPokemonImage {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60vw;
}

.priceQuestion {
  font-size: 5vw;
  text-align: center;
}
</style>

<script>
import { store } from "../stores/store";
import { users } from "../json/users.json";
import { trades } from "../json/trades.json";

export default {
  props: {
    canDisplay: Boolean,
    canDisplayPrice: Boolean,
    canDisplayTrade: Boolean,
    actualPokemon: Object,
    canDisplayTradeChoice: Boolean,
  },
  emits: ["update:canDisplay"],
  data() {
    return {
      store,
    };
  },
  methods: {
    buyPokemon(actualPokemon) {
      if (
        JSON.parse(actualPokemon.price) >
        JSON.parse(store.acutalUserDatas.userCoins)
      ) {
        alert("You don't have enough coins");
      } else {
        store.acutalUserDatas.userShop.forEach((element) => {
          if (element === actualPokemon.pokemonID) {
            actualPokemon.pokemonGrayScale = "1";
            users.forEach((elm) => {
              if (elm.userID === store.acutalUserDatas.userID) {
                elm.discoveredPokemon.push(actualPokemon.pokemonID);
                elm.userCoins =
                  store.acutalUserDatas.userCoins - actualPokemon.price;
                store.acutalUserDatas = elm;
              }
            });
          }
        });
      }
    },
    tradePokemon(actualPokemon) {
      if (
        JSON.parse(actualPokemon.tradePrice) >
        JSON.parse(store.acutalUserDatas.userCoins)
      ) {
        alert("You don't have enough coins");
      } else {
        for (let i = 0; i < store.arrayTrade.length; i++) {
          if (store.arrayTrade[i].pokemonID === actualPokemon.pokemonID) {
            users.forEach((e) => {
              if (e.userID === actualPokemon.pokemonTrader) {
                e.userCoins =
                  JSON.parse(e.userCoins) +
                  JSON.parse(actualPokemon.tradePrice);
              }
            });
            store.arrayTrade.splice(i, 1);
            trades.splice(i, 1);
            users.forEach((elm) => {
              if (elm.userID === store.acutalUserDatas.userID) {
                elm.discoveredPokemon.push(actualPokemon.pokemonID);
                elm.userCoins =
                  store.acutalUserDatas.userCoins - actualPokemon.tradePrice;
                store.acutalUserDatas = elm;
              }
            });
          }
        }
      }
      store.doTradeInit();
    },
    addToTradePokemon(actualPokemon) {
      let temp = trades.map((elm) => elm.pokemonID);
      if (temp.includes(actualPokemon.pokemonID)) {
        return;
      }
      users.forEach((element) => {
        if (element.userID === store.acutalUserDatas.userID) {
          for (let i = 0; i < element.discoveredPokemon.length; i++) {
            if (element.discoveredPokemon[i] === actualPokemon.pokemonID) {
              element.discoveredPokemon.splice(i, 1);
              store.acutalUserDatas = element;
              store.checkIfDiscovered();
              trades.push({
                pokemonID: `${actualPokemon.pokemonID}`,
                sellerID: `${element.userID}`,
              });
            }
          }
        }
      });
    },
  },
};
</script>
