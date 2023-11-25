<template lang="pug">
v-card
  v-card-title.headline
    | {{ title }}
  v-card-subtitle.headline {{ value }}
</template>

<script>
export default {
  props: {
    title: String,
    value: [String, Number],
    icon: String
  }
}
</script>

<style scoped>
.info-card {
  width: 50%;  /* Set the width to your desired value or use other sizing classes like 'max-width' */
}
</style>
