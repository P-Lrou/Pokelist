<template>
  <img
    @click="this.$router.go(-1)"
    src="../assets/arrow_white.svg"
    class="arrowBack"
  />
  <h1 class="welcomeText">Welcome</h1>
  <h1 class="userNameText">{{ store.acutalUserDatas.userID }}</h1>
  <h2 class="coinsNumber">
    Coins Number : {{ store.acutalUserDatas.userCoins }}
  </h2>
  <h2 class="pokemonsNumber">
    Pokemons Number : {{ store.acutalUserDatas.discoveredPokemon.length }} /
    {{ pokemons.length }}
  </h2>
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
  <router-link
    @click="store.isAuthenticated = false"
    class="linkToLogOut"
    to="/"
  >
    <p class="logOut">LogOut</p>
  </router-link>
</template>

<style>
.arrowBack {
  width: 15vw;
  transform: rotate(180deg);
  filter: invert(1);
}

.welcomeText {
  text-align: center;
  color: white;
  font-size: 10vw;
}

.userNameText {
  text-align: center;
  color: white;
  font-size: 8vw;
}

.coinsNumber {
  color: white;
  font-size: 6vw;
}

.pokemonsNumber {
  color: white;
  font-size: 6vw;
}

.changeUserInfo {
  margin-top: 10vh;
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
