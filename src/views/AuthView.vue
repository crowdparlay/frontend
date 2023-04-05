<script setup lang="ts">
import SignInForm from "@/components/SignInForm.vue";
import type SignInResult from "@/api/types/SignInResult";
import {reactive} from "vue";
import SignUpForm from "@/components/SignUpForm.vue";
import type SignUpResult from "@/api/types/SignUpResult";
import router from "@/router";
import type SignInRequest from "@/api/types/SignInRequest";
import type SignUpRequest from "@/api/types/SignUpRequest";

const state = reactive({
  requireSignUp: false,
  credentials: {
    username: '',
    password: ''
  }
})

function handleSignInResult(result: SignInResult, request: SignInRequest) {
  state.credentials = request

  if (result.success)
    router.push({name: 'auth'})
  else if (!result.userExists)
    state.requireSignUp = true
}

function handleSignUpResult(result: SignUpResult, request: SignUpRequest) {
  if (result.success)
    router.push({name: 'about'})
}
</script>

<template>
  <main>
    <SignUpForm
        v-if="state.requireSignUp"
        v-bind:credentials="state.credentials"
        @sign-up-attempt="handleSignUpResult"/>
    <SignInForm
        v-else
        @sign-in-attempt="handleSignInResult"/>
  </main>
</template>

<style>
p {
  color: red;
}
</style>
