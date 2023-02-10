<template>
  <header>
    <nav>
      <ul id="navbar">
        <li>
          <router-link active-class="active" to="/pokemon">Pokemon</router-link>
        </li>
        <li>
          <router-link active-class="active" to="/favourite"
            >Favourite</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* header {
  width: 100%;
  height: 5rem;
  background-color: #ffcc00;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: black;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active {
  color: #ffcc00;
  border-color: #d5a100;
  background-color: red;
}

.active {
  color: #ffcc00;
  border-color: #d5a100;
  background-color: red;
}

nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: blue;
  cursor: pointer;
} */
#navbar {
  display: flex;
  justify-content: center;
  background-color: #ef5350;
  list-style-type: none;
  margin: 0;
  padding: 10px;
  border-bottom: 2px solid #ef5350;
}

#navbar li {
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-family: "Pokemon Solid";
  margin: 0 10px;
}

#navbar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px;
}

#navbar a:hover {
  background-color: #d32b2b;
  color: #f0e0b0;
}
</style>