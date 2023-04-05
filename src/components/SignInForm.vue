<script setup lang="ts">
import {reactive} from "vue";
import AuthService from "@/api/services/AuthService";
import Hinted from "./Hinted.vue";
import type SignInResult from "@/api/types/SignInResult";
import type SignInRequest from "@/api/types/SignInRequest";

const emit = defineEmits<{
  (e: 'signInAttempt', result: SignInResult, request: SignInRequest): void
}>()

const state = reactive({
  username: '',
  password: '',
  passwordHint: ''
})

async function handleSubmit() {
  const request = {
    username: state.username,
    password: state.password
  }

  const result = await AuthService.signIn(request)

  if (!result.success) {
    if (result.userExists === true)
      state.passwordHint = 'Не подходит'
  }

  emit('signInAttempt', result, request)
}

function handleCredentialsChange() {

  state.passwordHint = ''
}
</script>

<template>
  <form @submit.prevent>
    <input
        v-model="state.username"
        v-on:input="handleCredentialsChange()"
        placeholder="Логин"/>
    <Hinted v-bind:hint=state.passwordHint>
      <input
          v-model="state.password"
          v-on:input="handleCredentialsChange()"
          placeholder="Пароль"
          type="password"/>
    </Hinted>
    <button type="submit" @click="handleSubmit()">Войти</button>
  </form>
</template>