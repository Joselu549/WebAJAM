<template>
    <div>
        <header class="shadow-md">
            <nav class="container mx-auto p-4 flex justify-between items-center">
                <NuxtLink to="/" class="font-bold">AJAM</NuxtLink>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/" class="btn">Inicio</NuxtLink></li>
                    <li><NuxtLink to="/about" class="btn">Sobre nosotros</NuxtLink></li>
                </ul>
                <div></div>
            </nav>
        </header>

        <div class="container mx-auto p-4">
            <slot />
        </div>

        <footer class="mx-auto p-4 text-center">
            <p>&copy; 2025 Asociación Jumillana Amigos de la Música. Todos los derechos reservados.</p>
        </footer>
    </div>
</template>

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