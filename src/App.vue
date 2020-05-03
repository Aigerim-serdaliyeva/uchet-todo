<template>
    <div id="app">
        <Header />
        <MainMenu />
        <main class="page-wrapper">
            <div class="container">
                <router-view />
            </div>
        </main>
        <footer>
            <div class="container">
                <Footer />
            </div>
        </footer>
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import MainMenu from './components/MainMenu.vue'

export default {
  name: 'App',
  components: { MainMenu, Footer, Header }
}
</script>

<style>
#app {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
