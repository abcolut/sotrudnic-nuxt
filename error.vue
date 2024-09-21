<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h2>Страницы не существует- ошибка {{ error.statusCode }}</h2>
    <p align=center> 
      <button @click="handleError" class="btn btn-info">Перейти в в корень проекта</button>
    </p>
  </div>
</template>