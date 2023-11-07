<template>
  <v-content>
    <v-navigation-drawer expand-on-hover rail location="right">
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/95.jpg"
          title="Sachin Kumar Verma"
          subtitle="sverma@argusoft.com"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          @click="logout()"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-content>
</template>

<script>
import { mapActions } from "vuex";
export default {
  
  methods: {
    ...mapActions("user", ["disableLogin"]),

    //redirecting the user to login Page after logging out
    logout() {
      this.disableLogin();
      this.$router.push("/login");
    },
  },
};
</script>