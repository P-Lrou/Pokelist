import { reactive } from "vue";
import { pokemons } from "../json/pokemons.json";
import { users } from "../json/users.json";
import { trades } from "../json/trades.json";

export const store = reactive({
  isAuthenticated: false,
  acutalUserDatas: "",
  userShop: [],
  arrayOnScreen: [],
  arrayFilterWithDiscoverOrNot: [],
  arrayWithOnlyDiscovered: [],
  arrayWithNotDiscover: [],
  arrayFilter: [],
  newArrayShop: [],
  arrayTrade: [],
  canDisplayPokedex: true,
  canDisplayTrade: false,
  canDisplayShop: false,

  checkIfDiscovered() {
    store.arrayFilterWithDiscoverOrNot = [];
    store.arrayWithOnlyDiscovered = [];
    store.arrayWithNotDiscover = [];
    for (let i = 0; i < pokemons.length; i++) {
      for (let v = 0; v < store.acutalUserDatas.discoveredPokemon.length; v++) {
        if (
          pokemons[i].pokemonID === store.acutalUserDatas.discoveredPokemon[v]
        ) {
          pokemons[i].pokemonGrayScale = "0";
          store.arrayFilterWithDiscoverOrNot.push(pokemons[i]);
          store.arrayWithOnlyDiscovered.push(pokemons[i]);
        }
      }
      if (
        !store.arrayFilterWithDiscoverOrNot
          .map((elm) => elm.pokemonID)
          .includes(pokemons[i].pokemonID)
      ) {
        pokemons[i].pokemonGrayScale = "1";
        store.arrayFilterWithDiscoverOrNot.push(pokemons[i]);
        store.arrayWithNotDiscover.push(pokemons[i]);
      }
    }
    store.arrayOnScreen = store.arrayFilterWithDiscoverOrNot;
    return store.arrayOnScreen;
  },

  filterByNameType(resersh) {
    store.arrayFilter = [];
    store.arrayWithOnlyDiscovered.filter((elm) => {
      if (
        elm.pokemonName.toUpperCase().includes(resersh.toUpperCase()) ||
        elm.pokemomonType.toUpperCase().includes(resersh.toUpperCase())
      ) {
        store.arrayFilter.push(elm);
      }
    });
    if (resersh.length === 0) {
      return (store.arrayOnScreen = store.arrayFilterWithDiscoverOrNot);
    }
    store.arrayOnScreen = store.arrayFilter;
    return store.arrayOnScreen;
  },

  doShopInit() {
    store.userShop = [];
    for (let i = 0; i < pokemons.length; i++) {
      for (let v = 0; v < store.acutalUserDatas.userShop.length; v++) {
        if (pokemons[i].pokemonID === store.acutalUserDatas.userShop[v]) {
          pokemons[i].pokemonGrayScale = "0";
          store.userShop.push(pokemons[i]);
        }
      }
    }
    store.userShop.forEach((element) => {
      store.arrayWithOnlyDiscovered.forEach((elm) => {
        if (element.pokemonID === elm.pokemonID) {
          element.pokemonGrayScale = "1";
        }
      });
    });
    return store.userShop;
  },

  checkIfShopNeedReset() {
    const actualDate = new Date();
    const oldDate = new Date(`${store.acutalUserDatas.lastShopUpdate}`);
    const diffDays = Math.floor((actualDate - oldDate) / (1000 * 60 * 60 * 24));
    if (diffDays >= 7) {
      users.forEach((element) => {
        if (element.userID === store.acutalUserDatas.userID) {
          element.lastShopUpdate = actualDate;
          store.acutalUserDatas = element;
          store.resetShop();
        }
      });
    }
  },

  resetShop() {
    console.log("Enter in Reset");
    store.newArrayShop = [];
    for (let i = 0; store.newArrayShop.length < 6; i++) {
      let randomNumber = Math.floor(
        Math.random() * store.arrayWithNotDiscover.length
      );
      if (
        store.newArrayShop.includes(
          store.arrayWithNotDiscover[randomNumber].pokemonID
        )
      ) {
        console.log(randomNumber);
      } else {
        store.newArrayShop.push(
          store.arrayWithNotDiscover[randomNumber].pokemonID
        );
      }
    }
    users.forEach((element) => {
      if (element.userID === store.acutalUserDatas.userID) {
        element.userShop = store.newArrayShop;
        store.acutalUserDatas = element;
      }
    });
    console.log(store.newArrayShop);
  },

  doTradeInit() {
    store.arrayTrade = [];
    trades.forEach((element) => {
      pokemons.forEach((elm) => {
        if (element.pokemonID === elm.pokemonID) {
          elm.pokemonGrayScale = "0";
          store.arrayTrade.push(elm);
        }
      });
    });
    store.arrayWithOnlyDiscovered.forEach((element) => {
      if (
        store.arrayWithOnlyDiscovered
          .map((elm) => elm.pokemonID)
          .includes(element.pokemonID)
      ) {
        element.pokemonGrayScale = "1";
      }
    });
  },
});
