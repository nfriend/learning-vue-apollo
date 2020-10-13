<template>
  <div id="app">
    <div v-if="$apollo.queries.releases.loading">Loading...</div>
    <div v-else>
      <Releases />
    </div>
  </div>
</template>

<script>
import Releases from './Releases.vue';
import ReleasesQuery from '../graphql/queries/releases.query.graphql';

export default {
  name: 'App',
  apollo: {
    releases: {
      query: ReleasesQuery,
      update: data => data.project.releases.nodes,
    },
  },
  components: {
    Releases,
  },
};
</script>
