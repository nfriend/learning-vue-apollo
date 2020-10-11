<template>
  <div id="app">
    <div v-if="$apollo.queries.releases.loading">Loading...</div>
    <div v-else>
      <Releases />
    </div>
  </div>
</template>

<script>
import Releases from './components/Releases.vue';
import ReleasesQuery from './graphql/releases.query.graphql';

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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
