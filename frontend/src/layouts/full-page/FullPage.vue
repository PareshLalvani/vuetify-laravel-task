<template>
  <div class="layout--full-page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    if(this.$store.state.authToken){
      this.$router.push({ name: "Dashboard" });
    }
  }
}
</script>