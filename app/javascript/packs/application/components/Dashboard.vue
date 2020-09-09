<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body" v-if="user.data">
            <h5>Todos</h5>
            Firebase UID: {{ user.data.uid }}
            <ul class="list-group">
              <li class="list-group-item" v-for="todo in todos" :key="todo['.key']" :todo="todo">
                {{todo['.value']}}
                <button
                  class="btn btn-danger float-right"
                  @click.prevent="removeTodo(todo)"
                >Remove</button>
              </li>
            </ul>
            <br />
            <div class="form-group">
              <label>New Todo:</label>
              <input v-model="newTodo" type="text" class="form-control" />
            </div>
            <div class="form-group">
              <button type="submit" @click.prevent="addTodo()" class="btn btn-primary btn-block">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { database } from "../plugins/firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      todos: [],
      newTodo: "",
    };
  },
  methods: {
    removeTodo(todoKey) {
      database.ref("TODOS/" + todoKey[".key"]).remove();
    },
    addTodo() {
      database.ref("TODOS").push(this.newTodo);
      this.newTodo = "";
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  firebase: {
    todos: database.ref("TODOS"),
  },
};
</script>