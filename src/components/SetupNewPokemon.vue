<template>
  <div class="newPokemon">
    <img src="../assets/NewPokemon.png" class="MainTitleNewPokemon" />
    <img
      class="newPokemonDiscovered"
      :src="store.newPokemonDiscover.pokemonImg"
    />
    <p class="textForNewPokemon">
      You have discovered a new Pokémon called :
      <strong
        ><u> {{ store.newPokemonDiscover.pokemonName }}</u></strong
      >
    </p>
    <img
      src="../assets/AddToPokedex.png"
      class="AddToNewPokemon"
      @click="addToPokedexNewPokemon()"
    />
  </div>
</template>

<style>
.MainTitleNewPokemon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 85vw;
  margin-top: 10vh;
}

.newPokemonDiscovered {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3vh;
  width: 80vw;
  height: auto;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.2);
  border: solid black;
}

.textForNewPokemon {
  color: white;
  font-size: 6vw;
  text-align: center;
  margin-top: 5vh;
}

.AddToNewPokemon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70vw;
  margin-top: 5vh;
  border: solid white;
  padding: 1vw;
  border-radius: 5vw;
}
</style>

<script>
import { store } from "../stores/store";
import { users } from "../json/users.json";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    addToPokedexNewPokemon() {
      users.forEach((element) => {
        if (element.userID === store.acutalUserDatas.userID) {
          element.discoveredPokemon.push(store.newPokemonDiscover.pokemonID);
          element.userCoins = JSON.parse(element.userCoins) + 10;
          store.acutalUserDatas = element;
          store.canDisplayPokedex = true;
          store.canDisplayNewPokemon = false;
        }
      });
    },
  },
};
</script>
