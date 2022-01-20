<template>
  <div>
    <table class="table tbl responsive">
      <tr class="ta-c">
        <td><strong>Height</strong><br />{{ pokemon.height }} m</td>
        <td><strong>Weight</strong><br />{{ pokemon.weight }} kg</td>
        <td>
          <strong>Gender</strong><br />{{
            pokemon.gender == "genderless" ? "genderless" : "male/female"
          }}
        </td>
        <td><strong>Color</strong><br />{{ pokemon.color }}</td>
      </tr>
      <tr>
        <td><strong>HP</strong><br />{{ pokemon.hp }}</td>
        <td><strong>Speed</strong><br />{{ pokemon.speed }}</td>
        <td><strong>Attack</strong><br />{{ pokemon.attack }}</td>
        <td><strong>Defense</strong><br />{{ pokemon.defence }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "StatsInformation",
  props: {
    pokemon: {
      type: Object,
    },
  },
};
</script>


