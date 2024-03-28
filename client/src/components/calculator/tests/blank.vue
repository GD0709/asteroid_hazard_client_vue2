<template>

  </template>
  
  <script setup lang="ts">
import State from './../../../../model/state';

import {ref} from 'vue'

let state = ref(State.state)


    const dialog = ref(false)
  
    defineProps<{
      help_text?: string
      help_title?: string
    }>()
  </script>
  

  <style scoped lang="scss">
  </style>