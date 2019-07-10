<template>
  <div class="home">
    <NavBar/>
    <Suggestion/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import Suggestion from "@/components/Suggestion.vue";

export default {
  name: "station_suggestion",
  components: {
    NavBar,
    Suggestion
  }
};
</script>
