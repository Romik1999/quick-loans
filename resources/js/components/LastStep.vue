<template>
    <transition>

        <div v-show="stateLastStep" class="quiz__card">
            <form @submit.prevent="submitForm" action="#" class="quiz__card-inner">
                <div class="quiz__card-right">
                    <h3 class="quiz__card-title quiz__card-title--last">ХОРОШО.</h3>

                    <div class="quiz__card-subtitle">
                        ЗАПОЛНИТЕ ВАШИ КОНТАКТЫ
                        И ПОЛУЧИТЕ ВАШ ОДОБРЕННЫЙ КРЕДИТ!
                    </div>

                    <div class="quiz__box">

                        <div class="quiz__input-group">
                            <input
                                v-model="name"
                                :class="{'is-invalid' : (v$.name.required.$invalid && v$.$dirty) || (v$.name.minLength.$invalid && v$.$dirty)}"
                                :disabled="isDisabled"
                                type="text"
                                placeholder="Ваше имя"
                                class="quiz__input-last"
                            >

                            <div class="invalid-feedback" v-if="v$.name.required.$invalid && v$.$dirty">Обязательное поле.</div>
                            <div class="invalid-feedback" v-if="v$.name.minLength.$invalid && v$.$dirty">Минимальная длина {{v$.name.minLength.$params.min}}</div>
                        </div>

                        <div class="quiz__input-group">
                            <input
                                v-model="phone"
                                v-maska="'+7 (###) ###-####'"
                                :class="{'is-invalid' : (v$.phone.required.$invalid && v$.$dirty) || (v$.phone.minLength.$invalid && v$.$dirty)}"
                                :disabled="isDisabled"
                                type="tel"
                                placeholder="+7 (___) ___ - __ - __"
                                class="quiz__input-last"
                            >

                            <div class="invalid-feedback" v-if="v$.phone.required.$invalid && v$.$dirty">Обязательное поле.</div>
                            <div class="invalid-feedback" v-if="v$.phone.minLength.$invalid && v$.$dirty">Неверный формат</div>
                        </div>

                    </div>
                    <div class="quiz__button-wrap">
                        <button @click.prevent="toQuiz" class="button-o quiz__card-button quiz__card-button--prev">Назад</button>
                        <button type="submit" class="button quiz__card-button quiz__card-button--next">Отправить</button>
                    </div>
                </div>
            </form>
        </div>
    </transition>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    name: "LastStep",
    data() {
        return {
            name: '',
            phone: '',
            isDisabled: false,
            counters: null
        }
    },
    computed: {
        stateLastStep() {
            return this.$store.getters['modal/stateLastStep']
        },
        stateData(){
            return this.$store.getters['quiz/stateData']
        },
    },
    methods: {
        toQuiz() {
            this.$store.commit('modal/LAST_STEP_FALSE')
            this.$store.commit('modal/QUIZ_TRUE')
            console.log(this)
            this.$parent.$refs.quiz.dataAnswer = this.$store.getters['quiz/stateData'][this.$store.getters['quiz/stateData'].length - 1].answer
            console.log(this.$store.getters['quiz/stateData'][this.$store.getters['quiz/stateData'].length - 1].answer)
        },
        clear() {
            this.name = ''
            this.phone = ''
        },
        async submitForm () {
            const isFormCorrect = await this.v$.$validate()

            if (!isFormCorrect) return

            this.isDisabled = true
            await axios.post('api/v1/lead.add',{
                host: window.location.host,
                referrer: document.referrer,
                url_query_string: sessionStorage.getItem('urlQueryString'),
                name: this.name,
                phone: this.phone.replace(/\D/g,""),
                data: this.stateData
            }).then( response => {
                if(response.status === 201){
                    if (this.counters.ym) ym(this.counters.ym, "reachGoal", "order");
                    this.v$.$reset()
                    this.clear()
                    this.isDisabled = false
                    this.$store.commit('modal/LAST_STEP_FALSE')
                    this.$store.commit('modal/THANKS_QUIZ_TRUE')
                    this.$store.commit('quiz/CLEAR_DATA')
                }
            })
        }
    },
    validations() {
        return {
            name: {required, minLength: minLength(2)},
            phone: {required, minLength: minLength(17)}
        }
    },
    async created() {
        await axios
            .get("/api/v1/counters")
            .then((response) => {
                this.counters = response.data
            })
            .catch((error) => {
                console.log(error.message);
            });
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

.invalid-feedback {
    position:absolute;
    top: 0px;
    left: 10px;
    width: 100%;
    color: #dc3545;
    text-align: left;
    font-size: 14px;
}
</style>
