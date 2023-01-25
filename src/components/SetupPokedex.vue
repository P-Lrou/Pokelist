<template>
  <div class="pokedex">
    <div
      class="pokemon"
      v-for="newPokemons in checkIfDiscovered"
      :key="newPokemons.pokemonID"
      :class="newPokemons.pokemonID"
      :style="{
        'background-image': `url(${newPokemons.pokemonImg})`,
      }"
    ></div>
  </div>
</template>

<style>
.pokedex {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-left: 5vw;
  margin-right: 5vw;
}

.pokemon {
  width: 25vw;
  height: 25vw;
  margin: 1vw;
  background-size: cover;
  border: solid black;
}
</style>

<script>
import { store } from "../stores/store";
import { pokemons } from "../json/pokemons.json";

export default {
  data() {
    return {
      store,
      pokemons,
    };
  },
  computed: {
    checkIfDiscovered() {
      let newTab = [];
      for (let i = 0; i < pokemons.length; i++) {
        for (
          let v = 0;
          v < store.acutalUserDatas.discoveredPokemon.length;
          v++
        ) {
          if (
            pokemons[i].pokemonID === store.acutalUserDatas.discoveredPokemon[v]
          ) {
            newTab.push(pokemons[i]);
          }
        }
        if (
          !newTab.map((elm) => elm.pokemonID).includes(pokemons[i].pokemonID)
        ) {
          pokemons[i].pokemonImg =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png";
          newTab.push(pokemons[i]);
        }
      }
      return newTab;
    },
  },
};
</script>
