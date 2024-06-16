<template>
  <v-container>
    <app-header />
    <sign-up v-if="sign_up" @alreadyExisting="sign_up=false" />
    <sign-in v-else @newUser="sign_up=true"/>
    <v-snackbar v-model="loginSnackbar" multi-line color="error" location="top" :timeout="snackBarTimeout" @update:model-value="handleLoginSnackbarValue">
        <div class="text-subtitle-1 pb-2">Error: You're not logged in!</div>
        <p>Please sign in or sign up to proceed!</p>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

// Components
import AppHeader from "../components/AppHeader.vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";

export default defineComponent({
  name: "AuthView",

  data() {
    return {
      sign_up: false,
      snackBarTimeout: 2500
    };
  },

  components: {
    AppHeader,
    SignUp,
    SignIn
  },

  computed:{
    ...mapGetters({
      loginSnackbar: 'getLoginSnackbar'
    })
  },

  methods: {
    ...mapActions({
      resetLoginSnackbar: 'resetLoginSnackbar'
    }),
    handleLoginSnackbarValue(){
      if(this.loginSnackbar){
        setTimeout(() => {
          this.resetLoginSnackbar();
        }, this.snackBarTimeout)
      }
    }
  }

});
</script>
