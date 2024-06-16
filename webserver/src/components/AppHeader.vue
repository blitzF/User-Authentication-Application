<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          {{ app_name }}
        </h1>

        <p class="subheading font-weight-regular">
          This application is developed by
          <a href="https://www.linkedin.com/in/mohammadabdullah-dev/" target="_blank"
              >Mohammad Abdullah</a
          >
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",

  data() {
    return {
      app_name: "User Authentication Application"
    };
  },
});
</script>
