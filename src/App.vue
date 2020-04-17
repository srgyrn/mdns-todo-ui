<template>
  <div id="app">
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Simple to-do list
          </h1>
          <h2 class="subtitle">
            Keeps track of your chores!
          </h2>
        </div>
      </div>
    </section>
    <List></List>
  </div>
</template>

<script>
import List from "./components/List";

export default {
  name: "App",
  components: { List }
};
</script>

<style lang="css">
@import "~bulma/css/bulma.min.css";
</style>
