<template>
  <router-link class="linkBackToProfile" to="/Profile">
    <img class="arrowBack" src="../assets/arrow_white.svg" />
  </router-link>
  <div class="textHelp">
    <h1 class="titleHelp">Welcome to the Help Menu</h1>
    <h2 class="introHelp">
      Here you can find some explication about <strong><u>Pokelist</u></strong>
    </h2>
    <p>
      Pokelist is an application where the goal is to find all the Pokémon
      disponible in the app.<br /><br />
      There are several ways to discover new Pokémon :
      <br />
      - Buy them <br />
      - Exchange them to other players <br />
      - Discover them while walking around <br /><br />
      When you buy or trade a Pokémon it costs you a certain amount of money.
      number of Poképièces, it is possible to obtain them in different ways :<br />
      - With the 100 Poképièces obtained at the beginning of the game<br />
      - By offering Pokémon for sale at TradingPost <br />
      - Discovering a new Pokémon by moving (+10 Poképièces)
    </p>
    <h2 class="introHelp">
      List of the Place where new Pokemons can be discovered
    </h2>
    <div
      class="pokemonlist"
      v-for="newPokemons in positionLib"
      :key="newPokemons.newPokemonID"
      :class="newPokemons.newPokemonID"
    >
      <p>
        At {{ newPokemons.namePos }} between {{ newPokemons.hour }}h and
        {{ JSON.parse(newPokemons.hour) + 1 }}h
      </p>
    </div>
  </div>
</template>

<style>
.textHelp {
  margin-top: 2vh;
  margin-left: 5vw;
  margin-right: 5vw;
  padding: 3vw;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  border: solid black;
  text-align: center;
  max-height: 77vh;
  overflow-y: scroll;
  margin-bottom: 8vh;
}

.titleHelp {
  font-size: 8vw;
}

.introHelp {
  font-size: 6vw;
  margin-bottom: 5vh;
}

.textHelp p {
  font-size: 4.5vw;
  text-align: left;
}
</style>

<script>
import { positionLib } from "../json/positionLib.json";

export default {
  data() {
    return {
      positionLib,
    };
  },
};
</script>
