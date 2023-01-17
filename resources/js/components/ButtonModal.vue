<template>
<button @click.prevent="modalTrue">
    <slot></slot>
</button>
</template>

<script>
export default {
    name: "ButtonModal",
    methods: {
        modalTrue() {
            this.$store.dispatch('modal/modalTrue')
        }
    }
}
</script>

<style scoped>

</style>
