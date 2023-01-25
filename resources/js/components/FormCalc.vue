<template>
    <form class="calc-form" action="">
        <div class="calc-form__range">
            <div class="range">
                    <span class="range__fill">
                         <span class="range__handler"></span>
                    </span>
                <input
                    ref="amount"
                    class="range__input"
                    type="range"
                    step="1000"
                    min="1000"
                    max="100000"
                    name="amount"
                    value="10000"
                >
            </div>
        </div>
        <div class="calc-form__bottom">
            <div class="calc-form__field">
                <input class="calc-form__input form__input--range" type="text" value="10 000">
            </div>
            <div class="calc-form__field">
                <input
                    v-model="phone"
                    v-maska="'+7 (###) ###-####'"
                    :class="{'is-invalid' : (v$.phone.required.$invalid && v$.$dirty) || (v$.phone.minLength.$invalid && v$.$dirty)}"
                    :disabled="isDisabled"
                    type="tel"
                    placeholder="Ваш телефон"
                    class="calc-form__input"
                    id="phoneCalc"
                >

                <div class="invalid-feedback" v-if="v$.phone.required.$invalid && v$.$dirty">Обязательное
                    поле.
                </div>
                <div class="invalid-feedback" v-if="v$.phone.minLength.$invalid && v$.$dirty">Неверный
                    формат
                </div>
            </div>

            <button @click.prevent="submitForm" type="submit" :disabled="isDisabled"
                    class="calc-form__button sbtn sbtn--red">Получить деньги
            </button>
        </div>
        <div class="calc-form__notice">Нажимая кнопку «Получить деньги», Вы даете согласие на
            обработку
            персональных данных
        </div>
    </form>
</template>

<script>
    import {useVuelidate} from '@vuelidate/core'
    import {required, minLength} from '@vuelidate/validators'

    export default {
        setup() {
            return {v$: useVuelidate()}
        },
        name: "FormCalc",
        data() {
            return {
                name: '',
                phone: '',
                isDisabled: false,
                counters: null
            }
        },
        computed: {},
        methods: {
            clear() {
                this.name = ''
                this.phone = ''
            },
            async submitForm() {
                const isFormCorrect = await this.v$.$validate()
                // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
                //console.log(this.v$.name.minLength.$params)
                // actually submit form
                this.isDisabled = true
                await axios.post('api/v1/lead.add', {
                    name: 'Новый пользователь',
                    amount: this.$refs.amount.value,
                    phone: this.phone.replace(/\D/g, ""),
                    host: window.location.host,
                    referrer: document.referrer,
                    url_query_string: sessionStorage.getItem('urlQueryString'),
                }).then(response => {
                    if (response.status === 201) {
                        if (this.counters.ym) ym(this.counters.ym, "reachGoal", "order");
                        this.v$.$reset()
                        this.clear()
                        this.isDisabled = false
                        this.$store.dispatch('modal/thanksTrue', {
                            title: 'Заявка отправлена',
                            text: 'Мы получили вашу заявку. Наш менеджер свяжется с вами.'
                        })
                    }
                })
            },
            modalFalseTarget(e) {
                if (e.target.classList.contains('modal')) {
                    this.$store.dispatch('modal/modalFalse')
                }
            },
            modalFalse() {
                this.$store.dispatch('modal/modalFalse')
            }
        },
        validations() {
            return {
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
    .v-enter-active, .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from, .v-leave-to {
        opacity: 0;
    }

    .invalid-feedback {
        position: absolute;
        top: -2px;
        left: 0;
        text-align: center;
        width: 100%;
        color: #dc3545;
        font-size: 14px;
    }

    .invalid-feedback--polit {
        top: auto;
        bottom: -15px;
    }
</style>
