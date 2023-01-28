<template>
  <router-link class="linkBackToProfile" to="/">
    <img class="arrowBack" src="../assets/arrow_white.svg" />
  </router-link>
  <img src="../assets/Welcome.png" class="MainTitleProfile" />
  <h1 class="userNameText">
    <strong>{{ store.acutalUserDatas.userID }}</strong>
  </h1>
  <div class="playerInfoProfile">
    <h2 class="coinsNumber">
      {{ store.acutalUserDatas.userCoins }}
      <img class="pokepieceProfile" src="../assets/Pokepiece.png" />
    </h2>
    <h2 class="pokemonsNumber">
      Pokemons : {{ store.acutalUserDatas.discoveredPokemon.length }} /
      {{ pokemons.length }}
    </h2>
  </div>
  <h2 class="changeUserInfo" @click="changeUsersInfo()">
    Change User informations :
  </h2>
  <input
    class="inputsChangeInfo"
    type="text"
    :placeholder="idPlaceholder"
    v-model="id"
  />
  <input
    class="inputsChangeInfo"
    type="password"
    :placeholder="passwordPlaceholder"
    v-model="password"
  />
  <p class="messageError">{{ messageError }}</p>
  <div class="bottomPageLinks">
    <router-link class="linkToHelp" to="/Help">
      <img class="LogOut" src="../assets/Help.png" />
    </router-link>
    <router-link
      @click="store.isAuthenticated = false"
      class="linkToLogOut"
      to="/"
    >
      <img class="LogOut" src="../assets/Log-out.png" />
    </router-link>
  </div>
</template>

<style>
.arrowBack {
  width: 15vw;
  transform: rotate(180deg);
}

.MainTitleProfile {
  display: block;
  margin-right: auto;
  margin-left: auto;
  width: 80vw;
}

.userNameText {
  text-align: center;
  color: white;
  font-size: 10vw;
}

.playerInfoProfile {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.coinsNumber {
  display: flex;
  color: white;
  font-size: 6vw;
}

.pokepieceProfile {
  margin-left: 2vw;
  width: 8vw;
  height: auto;
}

.pokemonsNumber {
  color: white;
  font-size: 6vw;
}

.changeUserInfo {
  margin-top: 5vh;
  text-align: center;
  color: white;
  font-size: 6vw;
}

.inputsChangeInfo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5vh;
  background-color: transparent;
  font-size: 5vw;
  color: white;
  text-align: center;
}

.bottomPageLinks {
  margin-top: 15vh;
  margin-bottom: 10vh;
  display: flex;
  justify-content: space-evenly;
}
</style>

<script>
import { store } from "../stores/store";
import { pokemons } from "../json/pokemons.json";
import { users } from "../json/users.json";

export default {
  data() {
    return {
      store,
      pokemons,
      idPlaceholder: "Enter your ID",
      id: "",
      passwordPlaceholder: "Enter your Password",
      password: "",
      messageError: "",
    };
  },
  methods: {
    changeUsersInfo() {
      if (this.id.toUpperCase().length === 0 || this.password.length === 0) {
        this.messageError = "Please Complete all section";
        return;
      }
      users.forEach((element) => {
        if (
          element.userID.toUpperCase() ===
          store.acutalUserDatas.userID.toUpperCase()
        ) {
          if (users.map((elm) => elm.userID).includes(this.id.toUpperCase())) {
            this.messageError = "This User ID is taked please change it";
            return;
          } else {
            element.userID = this.id.toUpperCase();
            element.userPassword = this.password;
            this.id = "";
            this.password = "";
            this.messageError = "Your account have been registed";
          }
        }
      });
      console.log(users);
    },
  },
};
</script>
