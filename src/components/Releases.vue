<template>
  <div>
    <h2>Some releases from GitLab's GraphQL endpoint:</h2>
    <div v-for="release in releases" :key="release.tagName" class="mb-2">
      <p>
        <b>{{ release.name }}:</b>
        {{ release.tagName }}
        <span class="awesome-indicator inline-block">
          <b v-if="release.isAwesome">(Awesome! 🎉)</b>
          <em v-else>(Not awesome <span class="not-italic">🙁</span>)</em>
        </span>
        <button
          class="ml-2"
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
      <input v-model="textToAdd" class="mt-2 mb-3" />
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
    // TO FIGURE OUT: Is this the proper way to get
    // data from a previously-executed query? (In this example,
    // a query that has already been executed by the parent component.)
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

      this.textToAdd = '';
    },
  },
};
</script>

<style scoped>
.awesome-indicator {
  width: 130px;
}
</style>
