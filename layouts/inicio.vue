<template>
  <head>
    <title>Asociación Jumillana Amigos de la Música</title>
  </head>
  <div>
    <header class="shadow-md">
      <nav
        :class="navClasses"
        class="fixed top-0 left-0 w-full z-50 mx-auto p-1 flex justify-between items-center transition-all duration-300"
      >
        <NuxtLink to="/" exact-active-class="text-yellow-500" class="font-bold">
          <img
            src="assets/img/logo.jpg"
            alt="logo"
            style="width: 50px; height: auto; cursor: pointer"
          />
        </NuxtLink>
        <ul class="flex gap-4">
          <li>
            <NuxtLink
              to="/"
              class="btn font-bold"
              exact-active-class="bg-[#fed136] text-white"
              >Inicio</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/about"
              class="btn font-bold"
              exact-active-class="bg-[#fed136] text-white"
              >Sobre nosotros</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="btn font-bold"
              exact-active-class="bg-[#fed136] text-white"
              >Contáctanos
            </NuxtLink>
          </li>
        </ul>
        <div></div>
      </nav>
    </header>
    <div class="mx-auto text-center">
      <slot />
    </div>

    <footer class="flex flex-col mx-auto p-4 gap-4 items-center text-center">
      <div class="flex justify-center items-center mx-auto gap-4">
        <div>
          <p class="font-bold">Asociación Jumillana Amigos de la Música</p>
          <p>Av. de Murcia, 29, 30520 Jumilla, Murcia</p>
          <p>Teléfono: 660 822</p>
        </div>
      </div>
      <hr style="border: 1px solid whitesmoke; width: 50%" />
      <div class="flex justify-center items-center mx-auto gap-4">
        <a href="https://www.facebook.com/ajambanda/" target="_blank"
          ><img
            src="assets/img/icons/facebook.png"
            alt="Facebook"
            style="width: 35px; height: 35px"
        /></a>
        <a href="https://www.instagram.com/ajambanda/" target="_blank"
          ><img
            src="assets/img/icons/instagram.png"
            alt="Instagram"
            style="width: 40px; height: 40px"
        /></a>

        <a href="https://www.youtube.com/@ajambanda" target="_blank"
          ><img
            src="assets/img/icons/youtube.png"
            alt="Youtube"
            style="width: 35px; height: 35px"
        /></a>
      </div>
      <p>
        &copy; 2025 Asociación Jumillana Amigos de la Música. Todos los derechos
        reservados.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScrolled: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 700;
    },
  },
  computed: {
    navClasses() {
      return {
        "bg-transparent": !this.isScrolled,
        "bg-[#333]": this.isScrolled,
        "transition-all": true,
        "duration-300": true,
      };
    },
  },
};
</script>

<style scoped>
header {
  background-color: #333;
  color: white;
}

header nav {
  color: #fed136;
}

footer {
  background-color: #333;
  color: white;
}
</style>
