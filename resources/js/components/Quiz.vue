<template>
    <transition>

        <div v-if="stateQuiz" class="quiz__card">
            <div ref="quiz" class="quiz__card-inner">
                <div class="quiz__card-right">
                    <h3 v-html="stateQuestionAnswer[stateStep].question" class="quiz__card-title"></h3>

                    <div v-if="stateQuestionAnswer[stateStep].type === 'radio'" class="quiz__box">

                        <div
                            v-for="answer in stateQuestionAnswer[stateStep].answers"
                            class="quiz__input-group">
                            <label class="quiz__label">
                                <input
                                    v-model="dataAnswer"
                                    @change="prevNext(1)"
                                    :value="answer"
                                    type="radio" name="quiz" class="quiz__radio">
                                <p class="quiz__label__text"><span>{{ answer }}</span></p>
                            </label>
                        </div>
                    </div>

                    <div class="quiz__button-wrap">
                        <a
                            v-if="stateStep === 0"
                            href="/"
                            class="button-o quiz__card-button quiz__card-button--prev">Назад</a>
                        <button
                            v-if="stateStep > 0"
                            @click.prevent="prevNext(-1)"
                            class="button-o quiz__card-button quiz__card-button--prev">Назад</button>
                        <button
                            @click.prevent="prevNext(1)"
                            class="button quiz__card-button quiz__card-button--next">Далее</button>
                    </div>
                </div>
            </div>
        </div>

    </transition>
</template>

<script>
import blink from "../assets/blink";
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators'

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    name: "Quiz",
    data() {
        return {
            type: '',
            dataAnswer: '',
            dataAnswerArr: [],
            myShow: true
        }
    },
    computed: {
        stateQuiz() {
            return this.$store.getters['modal/stateQuiz']
        },
        stateQuestionAnswer(){
            return this.$store.getters['quiz/stateQuestionAnswer']
        },
        stateStep(){
            return this.$store.getters['quiz/stateStep']
        },
        getDataAnswer(){
            if (this.$store.getters['quiz/stateData'][this.stateStep])
                return this.$store.getters['quiz/stateData'][this.stateStep].answer
            return false
        }
    },
    methods: {
        toMain() {
            this.$store.commit('modal/QUIZ_FALSE')
            this.$store.commit('modal/MAIN_TRUE')
        },
        prevNext(val){
            const object = {
                question: this.stateQuestionAnswer[this.stateStep].question,
                answer: ''
            }

            if(this.stateQuestionAnswer[this.stateStep].type === 'checkbox') {
                object.answer = this.dataAnswerArr.join()
            } else {
                object.answer = this.dataAnswer
            }

            if(this.stateQuestionAnswer[this.stateStep].type === 'input' && val > 0) {
                if (this.v$.$invalid) {
                    console.log(2)
                    this.v$.$touch()
                    return
                }
                this.v$.$reset()
            }
            this.$store.dispatch('quiz/setData',object)
            this.$store.dispatch('quiz/prevNext',val)
            this.dataAnswer = ''
            this.dataAnswerArr = []
            if (this.getDataAnswer && this.stateQuestionAnswer[this.stateStep].type !== 'checkbox') {
                this.dataAnswer = this.getDataAnswer
            } else if (this.getDataAnswer && this.stateQuestionAnswer[this.stateStep].type === 'checkbox') {
                this.dataAnswerArr = this.getDataAnswer.split(',')
            }
            blink(this.$refs.quiz)
        },
    },
    validations: {
        dataAnswer: {
            required,
            numeric: function (dataAnswer) {
                if (this.stateQuestionAnswer[this.stateStep].validate && this.stateQuestionAnswer[this.stateStep].validate.numeric) {
                    const notDigits = /\D/
                    if (notDigits.test(dataAnswer)) {
                        return false
                    }
                }
                return true
            }
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
