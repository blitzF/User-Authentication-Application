<template>
    <v-container>
      <v-row class="text-center">
        <v-col class="mb-5" cols="12">
            <h2 class="headline font-weight-bold mb-5">Welcome Back</h2>
            <p class="font-weight-regular">
                If you are a new user
                <v-btn size="small" variant="plain" class="pa-0" @click="$emit('newUser')">
                    click here
                </v-btn>
                to sign up.
            </p>
            <v-form fast-fail @submit.prevent="signInUser" v-model="valid" ref="signInForm">
            <v-container>
            <v-row justify="center">
                <v-col cols="12" md="4">
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    prepend-inner-icon="mdi-email"
                    hide-details
                    label="Email"
                    :error-messages="emailErrors"
                    @blur="validateEmail"
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" md="4">
                <v-text-field
                    v-model="password"
                    :type="passwordFieldType"
                    :rules="passwordRules"
                    prepend-inner-icon="mdi-security"
                    :append-inner-icon="passwordIcon"
                    hide-details
                    label="Password"
                    :error-messages="passwordErrors"
                    @blur="validatePassword"
                    @click:append-inner="handlePasswordIconChange"
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" md="4">
                    <v-btn
                        color="info"
                        type="submit"
                        :disabled="disableSubmit"
                        block
                    >
                    Sign In
                    </v-btn>
                </v-col>
            </v-row>
            </v-container>
        </v-form>
        </v-col>
      </v-row>
        <v-snackbar v-model="errorSnackbar" multi-line color="error" location="top" :timeout="snackBarTimeout">
            <div v-if="validationError" class="text-subtitle-1 pb-2">{{ errorSnackbarValidationHeading }}</div>
            <div v-else class="text-subtitle-1 pb-2">{{ errorSnackbarServerIssueHeading }}</div>
            <div v-html="errorMessage"></div>
        </v-snackbar>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { config } from "../config/api";
  import { mapActions } from "vuex";

  export default defineComponent({
    name: "SignIn",
  
    data() {
      return {
        valid: false,
        passwordIcon: 'mdi-eye-outline',
        passwordFieldType: 'password',
        errorSnackbarValidationHeading: 'Please correct following errors:',
        errorSnackbarServerIssueHeading: 'Server Error:',
        errorSnackbar: false,
        validationError: true,
        disableSubmit: false,
        errorMessage: '',
        snackBarTimeout: 3500,
        emailErrors: [] as string[],
        passwordErrors: [] as string[],
        email: '',
        emailRules: [
            (value: string | null | undefined) => {
                if (value) return true;
                return 'Email is required.';
            },
            (value: string | null | undefined) => {
                if (value && /.+@.+\..+/.test(value)) return true;
                return 'Email must be valid.';
            },
        ],
        password: '',
        passwordRules: [
            (value: string | null | undefined) => {
                if (value) return true;
                return 'Password is required.';
            }
        ],
      };
    },
    methods: {
        ...mapActions({
            setAuthToken: 'setAuthToken'
        }),
        handlePasswordIconChange(){
            if(this.passwordIcon === 'mdi-eye-outline'){
                this.passwordFieldType = 'text';
                this.passwordIcon = 'mdi-eye-off-outline'
            }else{
                this.passwordFieldType = 'password';
                this.passwordIcon = 'mdi-eye-outline';
            }
        },
        validateEmail(showSnackBar: boolean = true) {
            const rules = this.emailRules;
            const value = this.email;

            for (const rule of rules) {
                const result = rule(value);
                if (typeof result === 'string') {
                    this.emailErrors.push(result);
                }
            }

            if(this.emailErrors.length && showSnackBar){
                this.generateErrorMessage();
                this.showErrorSnackbar();
            }
        },
        validatePassword(showSnackBar: boolean = true) {
            const rules = this.passwordRules;
            const value = this.password;

            for (const rule of rules) {
                const result = rule(value);
                if (typeof result === 'string') {
                    this.passwordErrors.push(result);
                }
            }

            if(this.passwordErrors.length && showSnackBar){
                this.generateErrorMessage();
                this.showErrorSnackbar();
            }
        },
        generateErrorMessage(){
            const allErrors = [...this.emailErrors, ...this.passwordErrors];
            this.errorMessage = allErrors.join('<br>');
        },
        async signInUser(){
            this.validateEmail(false);
            this.validatePassword(false);
            if(this.emailErrors.length || this.passwordErrors.length){
                this.generateErrorMessage();
                this.showErrorSnackbar();

            }else{
                try{
                    const response = await fetch(`${config.API_SERVER_URL}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: this.email,
                            password: this.password,
                        }),
                    });
                    const data = await response.json();
                    if(data.statusCode !== 200){
                        this.validationError = false;
                        if(Array.isArray(data.message)){
                            this.errorMessage = data.message.join('<br>');
                        }else{
                            this.errorMessage = data.message;
                        }
                        this.showErrorSnackbar();
                    }else{
                        this.setAuthToken(data.accessToken);
                        this.$router.push('/');  
                    }
                }catch(err: any){
                    console.log("err while fetch => ", err);
                }
            }
        },
        showErrorSnackbar() {
            this.errorSnackbar = true;
            this.disableSubmit = true;
            setTimeout(() => {
                this.emailErrors = [];
                this.passwordErrors = [];
                this.errorMessage = '';
                this.errorSnackbar = false;
                this.disableSubmit = false;
                this.validationError = true;
            }, this.snackBarTimeout);
        },
    }
  });
  </script>
  