<template>
<!--  <Day1/>-->
  <Converter />
</template>

<script>
import Day1 from '@/components/Day1/Day1.vue'
import Converter from '@/components/Day1/Converter'

export default {
  name: 'App',
  components: {
    Day1,
    Converter
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
