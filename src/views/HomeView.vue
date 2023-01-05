<template>
  <div class="home">
    <navbar />
    Hello
  </div>
</template>

<script>
import navbar from "../components/SideNav.vue";
export default {
  name: "HomeView",
  components: { navbar },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200;400&display=swap");
.home {
  margin-left: 250px; /* Same width as the sidebar + left position in px */
  margin-top: 20px;
  padding: 0px 10px;
}
</style>
