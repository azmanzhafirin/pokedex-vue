<template>
  <div class="panel panel-default">
    <div id="table-overflow">
      <search-box v-model="searchString"></search-box>
      <div id="table-container">
        <b-table
          hover
          class="pokedex-table table-borderless"
          :fields="fields"
          :items="filteredData"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :filter-included-fields="['name', 'id']"
          @row-clicked="goToPokemonDetail"
        >
          <template #cell(image)="data">
            <img
              id="pokemon-image"
              :src="
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                data.item.id +
                '.png'
              "
            />
          </template>
          <template #cell(favourite)="data">
            <div v-if="!fromFavorite" class="container">
              <input
                type="checkbox"
                v-model="selected"
                v-on:change="setFavorites(data.item.name)"
                :value="data.item.name"
              />
              <span class="checkmark"></span>
            </div>
            <div v-else class="container">
              <b-button
                size="sm"
                v-on:click="setFavorites(data.item.name)"
                variant="danger"
                >Remove</b-button
              >
            </div>
          </template>
        </b-table>
      </div>
      <div id="button-load-more">
        <button v-on:click="loadMorePokemon">Load More</button>
      </div>
    </div>
  </div>
</template>


<script>
// import { mapActions } from "vuex";
import SearchBox from "../shared/SearchBox.vue";
export default {
  name: "PokemonList",
  components: { SearchBox },
  props: [
    "pokemonList",
    "value",
    "loadMoreClick",
    "setFavoriteClick",
    "favorites",
    "fromFavorite",
  ],
  data() {
    return {
      title: "Pokemon List",
      fields: [
        { key: "id", sortable: true },
        { key: "name", sortable: true },
        { key: "image", sortable: false },
        { key: "stats[0].base_stat", label: "HP", sortable: true },
        { key: "stats[1].base_stat", label: "Attack", sortable: true },
        { key: "stats[2].base_stat", label: "Defense", sortable: true },
        { key: "favourite", sortable: false },
      ],
      sortBy: "id",
      sortDesc: false,
      filter: null,
      selected: [],
      pokemons: [],
      searchString: "",
    };
  },
  computed: {
    filteredData: function () {
      var search_array = this.pokemons,
        searchString = this.searchString;
      if (!searchString) {
        return search_array;
      }
      searchString = searchString.trim().toLowerCase();
      search_array = search_array.filter((item) => {
        if (
          item.name.toLowerCase().indexOf(searchString) !== -1 ||
          item.id.toString() === searchString
        ) {
          return item;
        }
      });
      return search_array;
    },
  },

  methods: {
    goToPokemonDetail(data) {
      this.$router.push({
        path: `/pokemon/${data.id}`,
        params: { Pid: data.id },
      });
    },
    loadMorePokemon() {
      this.$emit("loadMoreClick");
    },
    setFavorites(name) {
      if (this.favorites.includes(name)) {
        console.log("Pokemon " + name + " is inside favorites. Deleting... ");
        const indexInArray = this.favorites.indexOf(name);
        this.$emit("deleteFavorite", indexInArray);
        localStorage.setItem("favPokemon", JSON.stringify(this.favorites));

        if (this.fromFavorite) {
          this.pokemons = this.pokemons.filter(function (obj) {
            return obj.name !== name;
          });
        }

        return;
      }
      console.log(
        "Pokemon " + name + " is NOT inside favorites. Inserting... "
      );
      this.$emit("addFavorite", name);
      localStorage.setItem("favPokemon", JSON.stringify(this.favorites));
    },
  },
  watch: {
    favorites: function (val) {
      this.selected = val;
      console.log(val);
    },
  },

  mounted() {
    this.pokemons = this.pokemonList;
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

#button-load-more {
  position: absolute;
  margin-left: -50px;
  left: 50%;
  width: 100px;
  bottom: 10px;
}
</style>
