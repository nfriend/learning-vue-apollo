<template>
  <div id="app">
    <Release
      v-for="release in releases"
      :release="release"
      :key="release.tagName"
    />
  </div>
</template>

<script>
import Release from './components/Release.vue';
import gql from 'graphql-tag';

export default {
  name: 'App',
  apollo: {
    releases: {
      query: gql`
        {
          project(fullPath: "gitlab-org/gitlab") {
            releases(first: 2) {
              nodes {
                name
                tagName
              }
            }
          }
        }
      `,
      update: data => data.project.releases.nodes,
    },
  },
  components: {
    Release,
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
