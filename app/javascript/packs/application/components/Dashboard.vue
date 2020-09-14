<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Todos for {{user.data.displayName}} ({{user.data.uid}})</div>
          <div class="card-body" v-if="user.data">
            <h5>Todos</h5>
            <Todos :user_uid="user.data.uid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Todos from './Todos.vue';

export default {
  components: { Todos },
  props: ['user_uid'],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['user'])
  }
};
</script>