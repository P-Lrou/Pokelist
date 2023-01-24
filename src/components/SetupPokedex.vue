<template>
  <div class="pokedex">
    <div
      class="pokemon"
      v-for="newPokemons in pokemons"
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
};
</script>
