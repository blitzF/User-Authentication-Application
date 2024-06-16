<template>
  <v-container>
    <app-header />
	<v-row class="text-center">
		<v-col cols="12">
			<h1>Welcome to the application.</h1>
		</v-col>
	</v-row>
	<v-snackbar v-model="welcomeSnackbar" multi-line color="success" location="top" :timeout="snackBarTimeout" @update:model-value="handleWelcomeSnackbarValue">
        <div class="text-subtitle-1 pb-2">Welcome!</div>
        <p>Best user auth app...</p>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

// Components
import AppHeader from "../components/AppHeader.vue";

export default defineComponent({
  name: "HomeView",

  data() {
    return {
		snackBarTimeout: 2500
    };
  },

  created(){
	if(!this.authToken){
		this.incrementUnAuthorizedAccessCount();
		if(this.unAuthAccessCount > 1){
			this.setLoginSnackBar();
		}
		this.$router.push('/login');
	}else{
		this.incrementHomePageVisit();
		if(this.homePageVisits === 1){
			this.setWelcomeSnackBar();
		}
	}
  },

  components: {
    AppHeader
  },

  computed:{
	...mapGetters({
		authToken: 'getAuthToken',
		unAuthAccessCount: 'getUnAuthorizedAccessCount',
		welcomeSnackbar: 'getWelcomeSnackbar',
		homePageVisits: 'getHomePageVisitCount'
	})
  },

  methods:{
	...mapActions({
		setLoginSnackBar: 'triggerLoginSnackbar',
		setWelcomeSnackBar: 'triggerWelcomeSnackbar',
		incrementUnAuthorizedAccessCount: 'incrementUnAuthorizedAccessCount',
		resetWelcomeSnackbar: 'resetWelcomeSnackbar',
		incrementHomePageVisit: 'incrementHomePageVisit'

	}),
	handleWelcomeSnackbarValue(){
      if(this.welcomeSnackbar){
        setTimeout(() => {
          this.resetWelcomeSnackbar();
        }, this.snackBarTimeout)
      }
    }
  }

});
</script>
