<template>
  <div>
    <h2>Some releases from GitLab's GraphQL endpoint:</h2>
    <div v-for="release in releases" :key="release.tagName">
      <p>
        <b>{{ release.name }}:</b>
        {{ release.tagName }}
        <em v-if="release.isAwesome">(Awesome)</em>
        <em v-else>(Not awesome)</em>
        <button
          @click="onToggleAwesomenessClick(release.tagName, release.isAwesome)"
        >
          Toggle awesomeness
        </button>
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
import releasesQuery from '../graphql/queries/releases.query.graphql';
import textQuery from '../graphql/queries/text.query.graphql';
import addToTextMutation from '../graphql/mutations/addToText.mutation.graphql';
import updateReleaseAwesomeness from '../graphql/mutations/updateReleaseAwesomeness.graphql';

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
    onToggleAwesomenessClick(tagName, isCurrentlyAwesome) {
      this.$apollo.mutate({
        mutation: updateReleaseAwesomeness,
        variables: { tagName, isAwesome: !isCurrentlyAwesome },
      });
    },
    onFormSubmit() {
      this.$apollo.mutate({
        mutation: addToTextMutation,
        variables: { newText: this.textToAdd },
      });
    },
  },
};
</script>
