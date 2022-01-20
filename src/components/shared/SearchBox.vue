<template>
  <div>
    <!-- <b-form-input
      id="search-bar"
      type="text"
      :value="inputData"
      @input="updateText($event.target.value)"
      placeholder="Type to search by name or id..."
    /> -->
    <input
      id="search-bar"
      type="text"
      :value="inputData"
      @input="updateValue($event.target.value)"
      placeholder="Type to search by name or id..."
    />
  </div>
</template>

<script>
export default {
  props: {
    inputData: String,
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/shared/_colours.scss";
@import "src/shared/_spacing.scss";

/* Search bar */
#search-bar {
  width: 100%;
  margin: 0 0 $lg 0;
  border: none;
  border-bottom: 3px solid lighten($grey, 28%);
  border-radius: 0;
  padding: 15px;
  background: #f1f1f1;
  transition: border 0.2s linear;
}

#search-bar,
#search-bar:focus,
#search-bar::placeholder {
  color: $grey;
}

#search-bar:focus {
  border-bottom: 3px solid lighten($grey, 15%);
}
</style>