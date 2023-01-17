<template>
    <transition>

        <div v-show="stateModalThanks" @click="modalThanksFalseTarget($event)" class="success success--active">
            <div class="success__dialog">
                <p @click="modalThanksFalse" class="success__close hover-text">Закрыть</p>
                <p class="success__title">{{ stateModalThanksContent.title }}</p>
                <p class="success__text">{{ stateModalThanksContent.text }}</p>
            </div>
        </div>

    </transition>
</template>

<script>
export default {
    name: "Thanks",
    computed: {
        stateModalThanks() {
            return this.$store.getters['modal/stateModalThanks']
        },
        stateModalThanksContent() {
            return this.$store.getters['modal/stateModalThanksContent']
        }
    },
    methods: {
        modalThanksFalse() {
            this.$store.dispatch('modal/modalThanksFalse')
        },
        modalThanksFalseTarget(e) {
            if (e.target.classList.contains('success')) {
                this.$store.dispatch('modal/modalThanksFalse')
            }
        }
    }
}
</script>

<style scoped>
.v-enter-active, .v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}
</style>
