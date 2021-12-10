<template>
    <h1>{{ title }} test</h1>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const title = ref<string>("title");

        return {
            title
        }
    }
});
</script>