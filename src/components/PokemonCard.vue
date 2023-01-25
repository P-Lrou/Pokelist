<template>
  <div class="cardPokemon" v-if="canDisplay">
    <img class="crossCard" src="../assets/cross_white.svg" />
    <h1 class="cardPokemonName">{{ actualPokemon.pokemonName }}</h1>
    <img class="actualPokemonImage" :src="actualPokemon.pokemonImg" />
    <h1>{{ actualPokemon.pokemonID }}</h1>
    <h1>{{ actualPokemon.pokemomonType }}</h1>
  </div>
</template>

<style>
.cardPokemon {
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.8);
  width: 80vw;
  height: 70vh;
  top: 15vh;
  left: 10vw;
  color: white;
}

.cardPokemonName {
  font-size: 8vw;
  text-align: center;
}

.crossCard {
  position: absolute;
  right: 2vw;
  top: 2vw;
  width: 10vw;
}
</style>

<script>
import { store } from "../stores/store";

export default {
  props: {
    canDisplay: Boolean,
    actualPokemon: Object,
  },
  data() {
    return {
      store,
    };
  },
};
</script>
