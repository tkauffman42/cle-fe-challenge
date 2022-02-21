<template>
  <div id="app">
    <Player />
  </div>
</template>

<script>
import Player from "./components/Player";

export default {
  name: "App",
  components: {
    Player,
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
/* background: red; */
#app {
  background-color: $pageBg;
  min-height: 100%;
}
</style>
