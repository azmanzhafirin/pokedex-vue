<template>
  <div class="panel panel-default">
    <div id="table-overflow">
      <b-form-input
        id="search-bar"
        v-model="searchString"
        placeholder="Type to search by name or id..."
      />
      <div id="table-container">
        <b-table
          hover
          class="pokedex-table table-borderless"
          :fields="fields"
          :items="pokemonList"
          @row-clicked="goToPokemonDetail"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :filter-included-fields="['name', 'id']"
          ref="table"
        >
          <template #cell(image)="data">
            <img
              id="pokemon-image"
              :src="
                'https://cdn.traction.one/pokedex/pokemon/' +
                data.item.id +
                '.png'
              "
            />
          </template>
          <template #cell(favourite)="data">
            <div class="container">
              <b-button
                size="sm"
                v-on:click="removeFavorite(data.item.name)"
                variant="danger"
                >Remove</b-button
              >
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  props: {
    favorites: {
      type: Array,
    },
    pokemons: {
      type: Array,
    },
    value: {},
  },
  data() {
    return {
      title: "Favorite List",
      startIndex: 0,
      endIndex: 15,
      pokemonList: [],
      fields: [
        { key: "id", sortable: true },
        { key: "name", sortable: true },
        { key: "image", sortable: false },
        { key: "stats[0].base_stat", label: "HP", sortable: true },
        { key: "stats[1].base_stat", label: "Attack", sortable: true },
        { key: "stats[2].base_stat", label: "Defense", sortable: true },
        { key: "favourite", label: "Remove", sortable: false },
      ],
      sortBy: "id",
      sortDesc: false,
      filter: null,
    };
  },
  computed: {
    searchString: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    goToPokemonDetail(data) {
      this.$router.push({
        path: `/pokemon/${data.id}`,
        params: { Pid: data.id },
      });
    },
    removeFavorite(name) {
      console.log("Pokemon checked =" + name);
      if (this.favorites.includes(name)) {
        console.log("Pokemon " + name + " is inside favorites. Deleting... ");
        const indexInArray = this.favorites.indexOf(name);

        this.$emit("deleteFavorite", indexInArray);

        localStorage.setItem("favPokemon", JSON.stringify(this.favorites));

        this.pokemonList = this.pokemonList.filter(function (obj) {
          return obj.name !== name;
        });
        console.log(this.pokemonList);
      }
    },
    checkLocalStorage() {
      console.log("checking local storage....");
      //Check local storage for any pokemons
      const data = localStorage.getItem("favPokemon");
      if (data && data.length > 0) {
        const parsedData = JSON.parse(data);
        this.setFavoritePokemonList(parsedData);
      }
    },
    ...mapActions(["setFavoritePokemonList"]),
  },

  created() {},
  mounted() {
    this.checkLocalStorage();
    this.pokemonList = this.pokemons;
  },
};
</script>

<style lang="scss" scoped>
@import "src/shared/_colours.scss";
@import "src/shared/_spacing.scss";

.panel {
  padding: $xl $xl 0 $xl;
}

/* Search table */
#table-overflow {
  overflow: hidden;
}

#pokemon-image {
  height: 50px;
  width: 50px;
}

#table-container {
  height: 80vh;
  width: 100%;
  border: none;
  overflow: auto;
  background: $white;
}

#table-container::-webkit-scrollbar {
  display: none;
}

.pokedex-table {
  padding: $lg;
  background: $white;
  cursor: pointer;
}

/* Search bar */
#search-bar {
  width: 100%;
  margin: 0 0 $lg 0;
  border: none;
  border-bottom: 3px solid lighten($grey, 28%);
  border-radius: 0;
  padding: $lg;
  background: lighten($grey, 28%);
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

.form-control {
  box-shadow: none;
}
</style>
