<template>
  <div>
    <h2>Some releases from GitLab's GraphQL endpoint:</h2>
    <div v-for="release in releases" :key="release.tagName">
      <p>
        <b>{{ release.name }}:</b>
        {{ release.tagName }}
      </p>
    </div>
    <hr />
    <h2>Some local state:</h2>
    <p>
      text:
      <b>{{ text }}</b>
    </p>
    <form @submit.prevent="onFormSubmit">
      <input v-model="textToAdd" style="margin-right: .5rem" />
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
