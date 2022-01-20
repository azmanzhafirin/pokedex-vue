<template>
  <div>
    <span id="pokemon-id">#{{ pokemon.id }}</span>
    <br />
    <h3 class="toCapitalFirst">{{ pokemon.name }}</h3>
    <div
      class="type-box"
      v-for="(type, index) in pokemon.types"
      :key="index"
      v-bind:class="type.type.name"
    >
      {{ type.type.name.toLowerCase() }}
    </div>
    <br />
    <div id="description-container">
      <img id="pokemon-sprite" v-if="pokemon.id" :src="pokemon.imageUrl" />
    </div>
    <p class="typography">{{ pokemon.description }}</p>
  </div>
</template>

<script>
export default {
  name: "BasicInformation",
  props: {
    pokemon: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/shared/_colours.scss";
@import "src/shared/_spacing.scss";

#pokemon-id {
  font-size: 16px;
  color: $grey;
}

#pokemon-sprite {
  margin: 0 auto;
  display: block;
  padding: $md;
  height: 200px;
  width: 200px;
}

.pokemon-cry {
  display: inline-block;
}
.type-box {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.175rem 0.5rem 0.16rem 0.5rem;
  margin: 3px 7.5px 3px 0;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1.5;
  color: #fff;
}

h3 {
  margin-top: -$sm;
  margin-left: -$sm;
  font-size: 36px;
}
</style>
