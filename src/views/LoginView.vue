<template>
  <img class="LogoTitle" src="../assets/Logo-Title.png" />
  <h2>Login PAGE</h2>
  <input type="text" :placeholder="idPlaceholder" v-model="id" />
  <input
    type="password"
    :placeholder="passwordPlaceholder"
    v-model="password"
    @keyup.enter="compareLogIn()"
  />
  <router-link class="linkToSignIn" to="/SignIn">Sign In</router-link>
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

.linkToSignIn {
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
    compareLogIn() {
      users.forEach((element) => {
        if (element.userID.toUpperCase() === this.id.toUpperCase()) {
          if (element.userPassword === this.password) {
            store.isAuthenticated = true;
            store.acutalUserDatas = element;
            console.log(store.acutalUserDatas);
            this.$router.push({ name: "Home" });
          }
        }
      });
    },
  },
};
</script>
