<template>
    <div class="p-4 max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Dream Feed</h2>

        <!-- Dream List -->
        <div v-for="dream in dreams" :key="dream.id" class="mb-4">
            <Card style="overflow: hidden">
                <template #header>
                    <img alt="user header" src="https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg" />
                </template>
                <template #title>{{ dream.name }}</template>
                <template #subtitle>{{ dream.type }}</template>
                <template #content>
                    <p class="m-0">
                        {{ dream.description }}
                    </p>
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <Button label="Dislike" severity="secondary" outlined class="w-full" />
                        <Button label="like" class="w-full" />
                    </div>
                </template>
            </Card>
        </div>

        <!-- Loading Spinner -->
        <div v-if="loading" class="flex justify-center py-4">
            <i class="pi pi-spin pi-spinner text-3xl text-gray-500"></i>
        </div>
    </div>
</template>

<script>
import { dummyDreams } from '@/service/dream.js';
import Card from 'primevue/card';
import { onMounted, ref } from 'vue';

export default {
    name: 'DreamFeed',
    components: {
        Card
    },
    setup() {
        const dreams = ref([]); // Dreams list
        const loading = ref(false); // Loading state
        const limit = ref(5); // Items to fetch per load
        const offset = ref(0); // Current offset for fetching dreams

        // Fetch dreams (dummy logic)
        const fetchDreams = () => {
            if (loading.value) return;

            loading.value = true;
            // Simulate API delay
            setTimeout(() => {
                const newDreams = dummyDreams.slice(offset.value, offset.value + limit.value);
                dreams.value = [...dreams.value, ...newDreams];
                offset.value += limit.value;
                loading.value = false;
            }, 1000);
        };

        // Handle infinite scroll
        const onScroll = () => {
            const scrollContainer = document.documentElement;
            if (scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 100) {
                fetchDreams();
            }
        };

        // Attach scroll event
        onMounted(() => {
            fetchDreams();
            window.addEventListener('scroll', onScroll);
        });

        return {
            dreams,
            loading
        };
    }
};
</script>

<style scoped>
/* Add responsive styles if needed */
</style>
