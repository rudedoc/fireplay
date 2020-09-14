<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="todo in todos" :key="todo['.key']" :todo="todo">
        <div class="row">
          <div class="col-7">
            <template v-if="todo.editable">
              <input type="text" class="form-control" :value="todo.text" />
            </template>
            <template v-else>{{ todo.text }}</template>
          </div>
          <div class="col-5">
            <template v-if="todo.editable">
              <button class="btn btn-success" @click.prevent="saveTodo(todo, $event)">Save</button>
              <button class="btn btn-secondary" @click.prevent="cancelEdit(todo)">Cancel</button>
            </template>
            <template v-else>
              <button class="btn btn-secondary" @click.prevent="makeEditable(todo)">Edit</button>
            </template>
            <button class="btn btn-danger" @click.prevent="removeTodo(todo)">Remove</button>
          </div>
        </div>
      </li>
    </ul>
    <br />
    <div class="form-group">
      <label>New Todo:</label>
      <input v-model="newTodo.text" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <button type="submit" @click.prevent="addTodo()" class="btn btn-primary btn-block">Add</button>
    </div>
  </div>
</template>
<script>
import { database } from '../plugins/firebase';
const todoCollection = database.ref('TODOS')

export default {
  props: ['user_uid'],
  data() {
    return {
      todos: [],
      newTodo: { text: "" },
    };
  },
  methods: {
    saveTodo(todo, event) {
      const value = event.target.parentElement.parentElement.querySelector("input").value;
      const updatedTodo = { ...todo, editable: false, text: value };
      database.ref(`TODOS/${this.user_uid}/${todo[".key"]}`).update(updatedTodo);
    },
    removeTodo(todo) {
      database.ref(`TODOS/${this.user_uid}/${todo[".key"]}`).remove();
    },
    addTodo() {
      database.ref(`TODOS/${this.user_uid}`).push(this.newTodo);
      this.newTodo = { text: "" };
    },
    makeEditable(todo) {
      database.ref(`TODOS/${this.user_uid}/${todo[".key"]}`).update({ editable: true });
    },
    cancelEdit(todo) {
      const updatedTodo = { ...todo, editable: false };
      database.ref(`TODOS/${this.user_uid}/${todo[".key"]}`).update(updatedTodo);
    },
  },
  watch: {
    user_uid: {
      immediate: true,
      handler(user_uid) {
        this.$rtdbBind('todos', todoCollection.child(user_uid));
      },
    },
  },
};
</script>