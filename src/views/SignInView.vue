<template>
  <img class="LogoTitle" src="../assets/Logo-Title.png" />
  <h2>Sign PAGE</h2>
  <input type="text" :placeholder="idPlaceholder" v-model="id" />
  <input
    type="password"
    :placeholder="passwordPlaceholder"
    v-model="password"
    @keyup.enter="addSignIn()"
  />
  <router-link class="linkToLogIn" to="/Login">Login</router-link>
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

h2 {
  text-align: center;
  font-size: 8vw;
  margin-bottom: 5vh;
  color: white;
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

.linkToLogIn {
  display: block;
  margin-top: 50vw;
  margin-left: 70vw;
  color: white;
  font-size: 5vw;
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
    addSignIn() {
      console.log(users);
      users.push({
        userID: `${this.id.toUpperCase()}`,
        userPassword: `${this.password}`,
      });
    },
  },
};
</script>
