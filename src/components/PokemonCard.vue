<template>
  <div class="cardPokemon" v-if="canDisplay">
    <img
      class="crossCard"
      src="../assets/cross_white.svg"
      @click="
        cantPay = false;
        $emit('update:canDisplay', false),
          $emit('update:canDisplayPrice', false),
          $emit('update:canDisplayTrade', false),
          $emit('update:canDisplayTradeChoice', false);
      "
    />
    <p class="cardPokemonName">{{ actualPokemon.pokemonName }}</p>
    <img class="actualPokemonImage" :src="actualPokemon.pokemonImg" />
    <div class="bottomImg">
      <p class="detailsPokemon">ID : {{ actualPokemon.pokemonID }}</p>
      <p class="detailsPokemon">Price : {{ actualPokemon.price }} PokePiece</p>
    </div>
    <p class="detailsPokemon">Type(s) : {{ actualPokemon.pokemomonType }}</p>
    <div v-if="canDisplayPrice" class="buy">
      <p v-if="cantPay === false" class="priceQuestion">
        <strong
          >Would you like to buy this Pokemon for
          {{ actualPokemon.price }} PokePiece ?</strong
        >
      </p>
      <p class="priceQuestion" v-if="cantPay === true">
        You don't have enough PokePiece
      </p>
      <div class="buttonsValidation">
        <button
          class="yesButton"
          @click="
            if (buyPokemon(actualPokemon) === true) {
              $emit('update:canDisplay', false),
                $emit('update:canDisplayPrice', false),
                $emit('update:canDisplayTrade', false),
                $emit('update:canDisplayTradeChoice', false);
            }
          "
        >
          Yes
        </button>
      </div>
    </div>
    <div v-if="canDisplayTrade" class="buy">
      <p v-if="cantPay === false" class="priceQuestion">
        <strong
          >Would you like to trade this Pokemon for
          {{ actualPokemon.tradePrice }} PokePiece ?</strong
        >
      </p>
      <p class="priceQuestion" v-if="cantPay === true">
        You don't have enough PokePiece
      </p>
      <div class="buttonsValidation">
        <button
          class="yesButton"
          @click="
            if (tradePokemon(actualPokemon) === true) {
              $emit('update:canDisplay', false),
                $emit('update:canDisplayPrice', false),
                $emit('update:canDisplayTrade', false),
                $emit('update:canDisplayTradeChoice', false);
            }
          "
        >
          Yes
        </button>
      </div>
    </div>
    <div v-if="canDisplayTradeChoice" class="buy">
      <p class="priceQuestion">
        <strong v-if="cantPay === false"
          >Would you like to put on the tradingpost this Pokemon for
          {{ actualPokemon.tradePrice }} PokePiece ?</strong
        >
      </p>
      <p v-if="cantPay === true" class="priceQuestion">
        This Pokemon is already in the tradingpost, please try later to trade
        it.
      </p>
      <div class="buttonsValidation">
        <button
          class="yesButton"
          @click="
            if (addToTradePokemon(actualPokemon) === true) {
              $emit('update:canDisplay', false),
                $emit('update:canDisplayPrice', false),
                $emit('update:canDisplayTrade', false),
                $emit('update:canDisplayTradeChoice', false);
            }
          "
        >
          Trade
        </button>
      </div>
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

.bottomImg {
  display: flex;
  justify-content: space-evenly;
}

.detailsPokemon {
  font-size: 4.5vw;
  text-align: center;
}

.priceQuestion {
  font-size: 5vw;
  text-align: center;
}

.buttonsValidation {
  display: flex;
  justify-content: space-evenly;
}

.yesButton {
  font-size: 4vw;
  padding: 1vw;
  padding-left: 5vw;
  padding-right: 5vw;
  background-color: darkgreen;
  border: transparent;
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
  emits: [
    "update:canDisplay",
    "update:canDisplayPrice",
    "update:canDisplayTrade",
    "update:canDisplayTradeChoice",
  ],
  data() {
    return {
      store,
      cantPay: false,
    };
  },
  methods: {
    buyPokemon(actualPokemon) {
      if (
        JSON.parse(actualPokemon.price) >
        JSON.parse(store.acutalUserDatas.userCoins)
      ) {
        this.cantPay = true;
        return;
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
      return true;
    },
    tradePokemon(actualPokemon) {
      if (
        JSON.parse(actualPokemon.tradePrice) >
        JSON.parse(store.acutalUserDatas.userCoins)
      ) {
        this.cantPay = true;
        return;
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
      return true;
    },
    addToTradePokemon(actualPokemon) {
      let temp = trades.map((elm) => elm.pokemonID);
      if (temp.includes(actualPokemon.pokemonID)) {
        this.cantPay = true;
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
              store.checkIfDiscovered();
              store.doTradeInit();
            }
          }
        }
      });
      return true;
    },
  },
};
</script>
