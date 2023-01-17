<template>
<transition>
    <div v-show="stateThanksQuiz" class="quiz__card-thanks" style="display: none;">
        <div class="quiz__card-thanks-inner">
            <h3 class="quiz__card-thanks-subtitle">Спасибо за заявку!</h3>
            <p class="quiz__card-thanks-descr">
                В ближайшее время
                наш оператор свяжется с вами
                для расчета стоимости
            </p>
            <a href="/" class="button quiz__card-thanks-button">Ок</a>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: "ThanksQuiz",
    computed: {
        stateThanksQuiz() {
            return this.$store.getters['modal/stateThanksQuiz']
        }
    },
    methods: {
        toMain() {
            this.$store.commit('modal/LAST_STEP_FALSE')
            this.$store.commit('modal/THANKS_QUIZ_FALSE')
            this.$store.commit('modal/MAIN_TRUE')
        }
    }
}
</script>

<style scoped>
.v-enter-active {
    transition: opacity 0.5s ease;
}

.v-enter-from {
    opacity: 0;
}
</style>
