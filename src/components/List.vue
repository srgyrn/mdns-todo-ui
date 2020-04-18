<template>
  <div class="container">
    <div class="section">
      <div
        id="errors"
        class="notification is-info is-light"
        v-show="errorMessage"
      >
        <button class="delete" @click="hideNotificationBox()"></button>
        {{ errorMessage }}
      </div>
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input
            type="text"
            data-testId="item-input"
            class="input"
            :placeholder="inputPlaceholder"
            v-model="newItemContent"
          />
        </p>
        <p class="control">
          <button
            class="button is-primary"
            data-testId="submit-button"
            @click="submitItem()"
          >
            Add
          </button>
        </p>
      </div>
    </div>
    <div class="box">
      <div class="content field">
        <p v-if="0 === items.length" class="has-text-centered">
          Your list is feeling lonely. There are no items in it yet.
        </p>
        <ol type="I" data-testId="list-display" v-else>
          <li
            v-for="item in items"
            :key="item.id"
            @mouseover="itemHover = true"
            @mouseleave="itemHover = false"
            :class="{
              'is-completed': item.isCompleted,
              'is-clickable': itemHover
            }"
          >
            {{ item.content }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style>
.is-completed {
  text-decoration: line-through;
}
.is-clickable {
  cursor: pointer;
}
</style>

<script>
import { getList, postItem } from "@/services/axios";
export default {
  name: "List",
  data() {
    return {
      items: [],
      inputPlaceholder: "Ex: Buy groceries",
      errorMessage: "",
      itemHover: false,
      newItemContent: ""
    };
  },
  async created() {
    await this.loadList();
  },
  methods: {
    hideNotificationBox() {
      this.errorMessage = "";
    },
    async loadList() {
      this.items = [];
      try {
        this.items = await getList();
      } catch (err) {
        this.errorMessage = "Something went wrong :/";
      }
    },
    async submitItem() {
      let value = this.newItemContent.trim();
      if ("" === value) {
        this.errorMessage =
          "Whoopsie! You seem to have forgotten to enter a new item.";
        return;
      }

      let newItem = await postItem(value);
      this.items.push(newItem);
    }
  }
};
</script>
