<template>
  <div id="spec-attack-container">
    <h4 style="font-size: 1.5rem">Pokemon Abilities</h4>
    <table class="table responsive">
      <tr v-for="(attack, index) in pokemon.special_attacks" :key="index">
        <td class="toCapitalFirst">
          {{ attack.ability.name }} - {{ attack.ability.description }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "SpecialAbilitiesInformation",
  props: {
    pokemon: {
      type: Object,
    },
  },
  methods: {},
  mounted() {
    //this.getAbilitiesDescription();
  },
};
</script>

<style lang="scss" scoped>
#spec-attack-container {
  margin: 15px 0;
}
</style>
