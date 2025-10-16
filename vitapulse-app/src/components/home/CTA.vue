<script setup lang="ts">

</script>

<template>
    <section
        class="py-20 bg-gradient-to-b from-transparent via-red-400 to-red-500 dark:from-transparent dark:via-red-600 dark:to-red-600 rounded-t-[50%_25%] text-white text-center transition-colors duration-300">
        <div class="max-w-4xl mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Ready to take control of your health?
            </h2>
            <p class="text-lg md:text-xl mb-8 text-white/90">
                Join thousands using <span class="font-semibold">VitaPulse</span> to live healthier every day.
            </p>
            <UButton size="lg" to="/register"
                class="text-red-500 bg-white hover:bg-red-100 font-semibold transition-colors duration-200">
                Create Account
            </UButton>
        </div>
    </section>
</template>
