<template>
  <input
    class="resershInput"
    type="text"
    :placeholder="resershPlaceholder"
    v-model="resersh"
    @keyup="store.filterByName(resersh)"
  />
  <div class="pokedex">
    <div
      class="pokemon"
      v-for="newPokemons in store.arrayOnScreen"
      :key="newPokemons.pokemonID"
      :class="newPokemons.pokemonID"
      :style="{
        'background-image': `url(${newPokemons.pokemonImg})`,
        filter: `grayscale(${newPokemons.pokemonGrayScale})`,
      }"
      @click="checkIfCanDisplay(newPokemons)"
    ></div>
  </div>
  <PokemonCard
    :actual-pokemon="selectedPokemon"
    :can-display="canDisplayPokemonCard"
  />
</template>

<style>
.resershInput {
  margin-top: 2vh;
  margin-left: 6vw;
  margin-bottom: 5vh;
  background-color: transparent;
  font-size: 4.5vw;
  width: 50vw;
  color: white;
}

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
import PokemonCard from "../components/PokemonCard.vue";

export default {
  components: {
    PokemonCard,
  },
  data() {
    return {
      store,
      resershPlaceholder: "Reserh a Pokemon here",
      resersh: "",
      selectedPokemon: {},
      canDisplayPokemonCard: false,
    };
  },
  created() {
    store.checkIfDiscovered();
  },
  methods: {
    checkIfCanDisplay(newPokemons) {
      if (newPokemons.pokemonGrayScale === "0") {
        this.selectedPokemon = newPokemons;
        this.canDisplayPokemonCard = true;
      }
    },
  },
};
</script>
