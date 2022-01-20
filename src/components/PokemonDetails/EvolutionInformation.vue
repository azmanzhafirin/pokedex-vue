<template>
  <div>
    <h4 style="font-size: 1.5rem">Evolution Chain</h4>
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row align-v="stretch">
        <b-col v-for="item in pokemon.evolution" :key="item.id">
          <b-img
            :src="getImageUrl(item.id)"
            style="width: 30%"
            alt="Responsive image"
          ></b-img>
          <p class="toCapitalFirst" v-if="item.name !== pokemon.name">
            {{ item.name }}
          </p>
          <p class="toCapitalFirst" v-else>
            <strong>{{ item.name }}</strong>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "EvolutionInformation",
  props: {
    pokemon: {
      type: Object,
    },
  },
  methods: {
    getImageUrl(imageId) {
      //const { width, height } = this.mainProps;
      return `https://cdn.traction.one/pokedex/pokemon/${imageId}.png`;
    },
  },
  mounted() {
    console.log(this.pokemon);
  },
};
</script>