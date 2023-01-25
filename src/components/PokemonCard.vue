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
</style>

<script>
import { store } from "../stores/store";

export default {
  props: {
    canDisplay: Boolean,
    actualPokemon: Object,
  },
  emits: ["update:canDisplay"],
  data() {
    return {
      store,
    };
  },
};
</script>
