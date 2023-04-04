<script setup lang="ts">
defineProps({
  hint: {
    type: String,
    default: undefined
  }
})
</script>

<template>
  <div>
    <div>
      <slot/>
    </div>
    <div v-if="hint" class="overlay">
      <div class="content">
        <img alt="" src="../assets/long-arrow.svg" class="arrow"/>
        <p>{{ hint }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.content {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  animation: reveal 0.4s ease-in-out;
}

.arrow {
  height: 130px;
  margin: 10px auto 22px auto;
  opacity: 0.4;
}

p {
  text-align: center;
  white-space: nowrap;
  color: var(--color-text);
}

@keyframes reveal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
