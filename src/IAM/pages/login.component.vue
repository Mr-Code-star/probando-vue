<script>
import SignIn from "../components/sign-in.component.vue";
import {UserService} from "../services/user.service.js";
import {UserAssembler} from "../services/user.assembler.js";

export default {
  name: "login",
  components: {SignIn},
  data() {
    return {
      users: [],
      userService: null
    }
  },
  async created() {
    this.userService = new UserService();
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        const response = await this.userService.getAll();
        this.users = UserAssembler.toEntitiesFromResponse(response);
      } catch (error) {
        console.error('Error loading users:', error)
      }
    },
    handleLoginSuccess(user) {
      // Store user data in Vuex or localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // You can also emit an event to the parent component if needed
    }
  }
}
</script>

<template>
  <sign-in
      :users="users"
      @login-success="handleLoginSuccess"
  ></sign-in>
</template>

<style>
</style>