<script setup lang="ts">
import AuthService from "@/api/services/AuthService";
import {reactive} from "vue";
import type SignInResult from "@/api/types/SignInResult";
import type SignUpRequest from "@/api/types/SignUpRequest";

const emit = defineEmits<{
  (e: 'signUpAttempt', result: SignInResult, request: SignUpRequest): void
}>()

const props = defineProps<{
  credentials: {
    username: string,
    password: string
  }
}>()

const state = reactive({
  displayName: ''
})

async function handleSubmit() {
  const request = {
    username: props.credentials.username,
    displayName: state.displayName,
    password: props.credentials.password
  }

  const result = await AuthService.signUp(request)
  emit('signUpAttempt', result, request)
}

</script>

<template>
  <form @submit.prevent>
    <input v-model="state.displayName" placeholder="Имя"/>
    <button type="submit" @click="handleSubmit()">Войти</button>
  </form>
</template>