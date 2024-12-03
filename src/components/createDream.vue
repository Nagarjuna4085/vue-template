<template>
    <div class="max-w-2xl mx-auto p-4 rounded-lg shadow-md">
        <!-- <div class="card">
            <Editor v-model="value" editorStyle="height: 320px" />
        </div> -->
        <!-- Form Title -->
        <h2 class="text-3xl font-semibold text-center text-primary mb-6">Create Your Dream</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Dream Name (Headline) -->
            <div class="flex flex-col">
                <label for="dreamName" class="">Dream Name</label>
                <InputText id="dreamName" v-model="dream.name" type="text" placeholder="Enter your dream headline" class="mt-2 p-3" />
            </div>

            <!-- Dream Type Dropdown -->
            <div class="flex flex-col">
                <label for="dreamType" class="text-lg">Select Dream Type</label>
                <Dropdown v-model="dream.type" :options="dreamTypes" option-label="label" placeholder="Select Dream Type" class="mt-2 w-full p-3 border border-gray-300 rounded-lg" />

                <!-- Custom Dream Type -->
                <div v-if="isCustomType" class="mt-4">
                    <InputText v-model="newType" type="text" placeholder="Enter custom type" class="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    <button @click="addCustomType" type="button" class="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none">Add Custom Type</button>
                </div>
            </div>

            <!-- Dream Description -->
            <div class="flex flex-col">
                <label for="dreamDescription" class="text-lg font-medium">Describe Your Dream</label>
                <!-- <Textarea id="dreamDescription" v-model="dream.description" rows="5" placeholder="Tell us about your dream" class="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></Textarea> -->
                <Textarea id="dreamDescription" v-model="dream.description" placeholder="Tell us about your dream" :autoResize="true" rows="3" cols="30" />
            </div>

            <!-- Submit Button -->
            <div class="flex justify-center">
                <Button type="submit" class="px-6 py-3 text-white rounded-lg">Submit Dream</Button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'DreamForm',
    setup() {
        const dream = ref({
            name: '',
            type: null,
            description: ''
        });
        const value = ref('');

        const dreamTypes = ref([
            { label: 'Lucid Dream', value: 'lucid' },
            { label: 'Nightmare', value: 'nightmare' },
            { label: 'Daydream', value: 'daydream' }
        ]);

        const newType = ref('');
        const isCustomType = ref(false);

        // Add custom dream type if not already in the list
        const addCustomType = () => {
            if (newType.value && !dreamTypes.value.some((type) => type.label.toLowerCase() === newType.value.toLowerCase())) {
                dreamTypes.value.push({ label: newType.value, value: newType.value.toLowerCase() });
                dream.value.type = newType.value.toLowerCase();
                newType.value = '';
                isCustomType.value = false;
            }
        };

        const handleSubmit = () => {
            // Handle the form submission logic (e.g., send data to an API or store)
            console.log('Dream Submitted:', dream.value);
        };

        return {
            dream,
            dreamTypes,
            newType,
            isCustomType,
            addCustomType,
            handleSubmit,
            value
        };
    }
};
</script>

<style scoped>
/* Global styles for this component */
input,
textarea {
    transition:
        border 0.2s ease,
        box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
    border-color: #4f87d4; /* Blue color focus */
    box-shadow: 0 0 0 2px rgba(79, 135, 212, 0.3); /* Soft glow effect */
}
</style>
