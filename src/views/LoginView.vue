<template>
  <h1 class="mainTitle">POKELIST</h1>
  <h2>Login PAGE</h2>
  <input type="text" :placeholder="idPlaceholder" v-model="id" />
  <input
    type="password"
    :placeholder="passwordPlaceholder"
    v-model="password"
    @keyup.enter="compareLogIn()"
  />
  <router-link to="/">Sign In</router-link>
</template>

<style>
h1 {
  top: 0vw;
  text-align: center;
  font-family: pokemonLight;
  font-size: 15vw;
}
h2 {
  top: 0vw;
  text-align: center;
  font-size: 8vw;
  margin-bottom: 10vh;
}
input {
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
import { users } from "../json/users.json";

export default {
  data() {
    return {
      store,
      idPlaceholder: "Enter your ID",
      id: "",
      passwordPlaceholder: "Enter your Password",
      password: "",
    };
  },
  methods: {
    compareLogIn() {
      users.forEach((element) => {
        if (element.userID.toUpperCase() === this.id.toUpperCase()) {
          if (element.userPassword === this.password) {
            store.isAuthenticated = true;
            this.$router.push({ name: "Home" });
          }
        }
      });
    },
  },
};
</script>
