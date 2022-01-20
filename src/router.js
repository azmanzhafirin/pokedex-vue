
import PokemonDetail from './components/Pokemons/PokemonDetail.vue';
import Home from './pages/Home.vue'
import Favourite from './pages/Favorite.vue'

export const routes = [
    { path: '/pokedex-vue', redirect: '/pokedex-vue/pokemon' },
    { path: '/pokedex-vue/pokemon', component: Home },
    { path: '/pokedex-vue/pokemon/:Pid', component: PokemonDetail },
    { path: '/pokedex-vue/favourite', component: Favourite },
    { path: '/pokedex-vue/:notFound(.*)', redirect: '/pokedex-vue/pokemon' },

];
