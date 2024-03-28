<template>

  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
    const dialog = ref(false)
  
    defineProps<{
      help_text?: string
      help_title?: string
    }>()
  </script>
  

  <style scoped lang="scss">
  </style>