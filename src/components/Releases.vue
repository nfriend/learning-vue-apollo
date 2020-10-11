<template>
  <div>
    <b>{{ text }}</b>
    <div v-for="release in releases" :key="release.tagName">
      <h2>{{ release.name }}</h2>
      <p>{{ release.tagName }}</p>
    </div>
  </div>
</template>

<script>
import ReleasesQuery from '../graphql/releases.query.graphql';
import TextQuery from '../graphql/text.query.graphql';

export default {
  apollo: {
    releases: {
      query: ReleasesQuery,
      update: data => data.project?.releases.nodes || [],
      fetchPolicy: 'cache-only',
    },
    text: TextQuery,
  },
};
</script>
