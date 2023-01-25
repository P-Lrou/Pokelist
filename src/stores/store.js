import { reactive } from "vue";
import { pokemons } from "../json/pokemons.json";

export const store = reactive({
  isAuthenticated: false,
  acutalUserDatas: "",
  arrayOnScreen: [],
  arrayFilterWithDiscoverOrNot: [],
  arrayWithOnlyDiscovered: [],
  arrayFilter: [],

  checkIfDiscovered() {
    for (let i = 0; i < pokemons.length; i++) {
      for (let v = 0; v < store.acutalUserDatas.discoveredPokemon.length; v++) {
        if (
          pokemons[i].pokemonID === store.acutalUserDatas.discoveredPokemon[v]
        ) {
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
      }
    }
    store.arrayOnScreen = store.arrayFilterWithDiscoverOrNot;
    return store.arrayOnScreen;
  },

  filterByName(resersh) {
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
});
