<script setup lang="ts">
import {reactive} from "vue";
import AuthService from "@/api/services/AuthService";
import Hinted from "./Hinted.vue";

const props = defineProps({
  handleResult: {type: Function}
})

const state = reactive({
  username: '',
  password: '',
  passwordHint: null as String | null
})

async function handleSubmit() {
  const result = await AuthService.signIn(state.username, state.password)

  if (!result.success && result.userExists === true)
    state.passwordHint = 'Не подходит'

  props.handleResult && props.handleResult(result)
}

function handleCredentialsChange() {
  state.passwordHint = null
}
</script>

<template>
  <form @submit.prevent>
    <input v-model="state.username" v-on:input="handleCredentialsChange()" placeholder="Логин"/>
    <Hinted v-bind:hint=state.passwordHint>
      <input v-model="state.password" v-on:input="handleCredentialsChange()" placeholder="Пароль" type="password"/>
    </Hinted>
    <button type="submit" @click="handleSubmit()">Войти</button>
  </form>
</template>