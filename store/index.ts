import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    tasks: [
      {
        content: 'hogehoge',
        done: false,
      },
    ],
  }),
  actions: {
    ADD_TASK(task: any) {
      this.tasks = [{ content: task, done: false }, ...this.tasks];
    },
    REMOVE_TASK(task: any) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    },
    TOGGLE_TASK(task: any) {
      task.done = !task.done;
    },
  },
});
