<template>
  <div class="footer">
  <div class="bg-teal d-flex w-100 align-center px-4">
    <strong>Get connected with us on social networks!</strong>
    <v-spacer></v-spacer>
    <v-btn
      v-for="icon in icons"
      :key="icon"
      class="mx-2"
      :icon="icon"
      variant="plain"
      size="small"
    ></v-btn>
  </div>

  <div class="px-4 py-2 bg-black text-center w-100">
    &copy{{ new Date().getFullYear() }} —
    <strong> Argusoft || All Rights Reserved</strong>
  </div>
</div>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scoped>
.footer{
  margin-top:40vh;
}
</style>
