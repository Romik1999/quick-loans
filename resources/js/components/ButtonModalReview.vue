<template>
<button @click.prevent="modalReviewTrue">
    <slot></slot>
</button>
</template>

<script>
export default {
    name: "ButtonModalReview",
    methods: {
        modalReviewTrue() {
            this.$store.dispatch('modal/modalReviewTrue')
        }
    }
}
</script>

<style scoped>

</style>
