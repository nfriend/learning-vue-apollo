<template>
  <div>
    <b>{{ text }}</b>
    <div v-for="release in releases" :key="release.tagName">
      <h2>{{ release.name }}</h2>
      <p>{{ release.tagName }}</p>
    </div>
    <hr />
    <form @submit.prevent="onFormSubmit">
      <input v-model="textToAdd" />
      <button>Add text</button>
    </form>
  </div>
</template>

<script>
import releasesQuery from '../graphql/releases.query.graphql';
import textQuery from '../graphql/text.query.graphql';
import addToTextMutation from '../graphql/addToText.mutation.graphql';

export default {
  data() {
    return {
      textToAdd: '',
    };
  },
  apollo: {
    releases: {
      query: releasesQuery,
      update: data => data.project?.releases.nodes || [],
      fetchPolicy: 'cache-only',
    },
    text: textQuery,
  },
  methods: {
    onFormSubmit() {
      this.$apollo.mutate({
        mutation: addToTextMutation,
        variables: { newText: this.textToAdd },
      });
    },
  },
};
</script>
