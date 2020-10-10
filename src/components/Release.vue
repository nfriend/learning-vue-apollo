<template>
  <h2>{{ release.name }}</h2>
</template>

<script>
export default {
  props: {
    release: {
      type: Object,
      required: true,
    },
  },
};
</script>
