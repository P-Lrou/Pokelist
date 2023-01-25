<template>
  <img class="LogoTitle" src="../assets/MainTitle.png" />
  <p class="messageError">{{ messageError }}</p>
  <input type="text" :placeholder="idPlaceholder" v-model="id" />
  <input
    type="password"
    :placeholder="passwordPlaceholder"
    v-model="password"
  />
  <img class="LogInButton" src="../assets/LogIn.png" @click="compareLogIn()" />
  <router-link class="linkToSignIn" to="/SignIn"
    ><img class="SignInLink" src="../assets/SignIn.png"
  /></router-link>
</template>

<style>
.LogoTitle {
  display: block;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  margin-bottom: 15vh;
}

.messageError {
  color: white;
  font-size: 5vw;
  color: white;
  text-align: center;
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

.LogInButton {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;
  width: 25vw;
  border: solid white;
  padding: 1vw;
  border-radius: 5vw;
}

.linkToSignIn {
  display: block;
  margin-top: 20vh;
  margin-left: 70vw;
}

.SignInLink {
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
    compareLogIn() {
      users.forEach((element) => {
        if (element.userID.toUpperCase() === this.id.toUpperCase()) {
          if (element.userPassword === this.password) {
            store.isAuthenticated = true;
            store.acutalUserDatas = element;
            this.$router.push({ name: "Home" });
          }
        }
      });
      this.id = "";
      this.password = "";
      this.messageError = "Wrong ID or Password";
    },
  },
};
</script>
