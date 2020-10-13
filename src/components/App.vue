<template>
  <div id="app">
    <h1>
      <a href="https://gitlab.com/nfriend">nfriend</a>'s
      <a href="https://apollo.vuejs.org/">Vue Apollo</a> test app
    </h1>
    <p>
      A silly little app to help me learn the ins and outs of
      <a href="https://apollo.vuejs.org/">Vue Apollo</a>.
    </p>
    <p class="flex items-center">
      <span>
        View the source
        <a href="https://gitlab.com/nfriend/learning-vue-apollo">here</a>.
      </span>
      <a
        href="https://gitlab.com/nfriend/learning-vue-apollo/-/pipelines/latest"
        class="ml-2"
      >
        <img
          src="https://gitlab.com/nfriend/learning-vue-apollo/badges/master/pipeline.svg"
          alt="GitLab build status"
        />
      </a>
    </p>

    <hr />

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
