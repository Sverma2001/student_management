<template>
  <v-app class="my-app-margin">
    <v-app-bar app color="purple" right>
      <div v-if="getLoggedInStatus">
        <v-btn @click="changeFormStatus" color="white"> {{$t("Add Student")}} </v-btn>
      </div>
      <v-list-item prepend-icon="mdi-translate" style="width: 250px">
        <v-select
          v-model="locale"
          :items="langs"
          label="Select Language"
          @change="selectOption"
          required
        ></v-select>
      </v-list-item>
    </v-app-bar>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      locale: '',
      langs: ["English", "French"],
    };
  },
  watch: {
      locale(value){
          this.$i18n.locale = value.toLowerCase();
      }
  },
  computed: {
    ...mapGetters("user", ["getLoggedInStatus"])
  },
  methods: {
    ...mapActions(["changeFormStatus"])
  },
};
</script>