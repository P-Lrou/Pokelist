<template>
  <img class="LogoTitle" src="../assets/MainTitle.png" />
  <p class="messageError">{{ messageError }}</p>
  <input
    class="inputsSignIn"
    type="text"
    :placeholder="idPlaceholder"
    v-model="id"
  />
  <input
    class="inputsSignIn"
    type="password"
    :placeholder="passwordPlaceholder"
    v-model="password"
    @keyup.enter="addSignIn()"
  />
  <img class="SignInButton" src="../assets/SignIn.png" @click="addSignIn()" />
  <router-link class="linkToLogIn" to="/Login"
    ><img class="LogInLink" src="../assets/LogIn.png"
  /></router-link>
</template>

<style>
.LogoTitle {
  display: block;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  margin-bottom: 10vh;
}

.messageError {
  color: white;
  font-size: 5vw;
  color: white;
  text-align: center;
}

.inputsSignIn {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5vh;
  background-color: transparent;
  font-size: 5vw;
  color: white;
  text-align: center;
}

.SignInButton {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;
  width: 25vw;
  border: solid white;
  padding: 1vw;
  border-radius: 5vw;
}

.linkToLogIn {
  display: block;
  margin-top: 20vh;
  margin-left: 70vw;
}

.LogInLink {
  width: 20vw;
}
</style>

<script>
import { store } from "../stores/store";
import { users } from "../json/users.json";

export default {
  data() {
    return {
      store,
      idPlaceholder: "Enter your ID",
      id: "",
      passwordPlaceholder: "Enter your Password",
      password: "",
      messageError: "",
    };
  },
  methods: {
    addSignIn() {
      if (this.id.toUpperCase().length === 0 || this.password.length === 0) {
        this.messageError = "Please Complete all section";
        return;
      }
      if (users.map((elm) => elm.userID).includes(this.id.toUpperCase())) {
        this.messageError = "This User ID is taked please change it";
        return;
      } else {
        users.push({
          userID: `${this.id.toUpperCase()}`,
          userPassword: `${this.password}`,
          discoveredPokemon: `[]`,
        });
        this.id = "";
        this.password = "";
        this.messageError = "Your account have been registed";
      }
    },
  },
};
</script>
