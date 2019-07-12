<template>
  <div class="home">
    <NavBar/>
    <Dashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from "@/components/Dashboard.vue";
import NavBar from "@/components/NavBar.vue";
import Suggestion from "@/components/Suggestion.vue";

export default {
  name: "home",
  components: {
    Dashboard,
    NavBar,
    Suggestion
  }
};
</script>
