<template>

  </template>
  
  <script setup lang="ts">
import State from './../../../model/state';

import {ref} from 'vue'

let state = ref(State.state)


    const dialog = ref(false)
  
    interface Props {
    size?:number
}
const props = withDefaults(defineProps<Props>(), {
    size: 200
})
  </script>
  

  <style scoped lang="scss">
  </style>