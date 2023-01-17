<template>
    <transition>

        <div v-show="stateModal" @click.prevent="modalFalseTarget($event)" class="modal modal--active">

            <form action="#" class="modal__dialog">
                <p @click="modalFalse" class="modal__close hover-text">Закрыть</p>
                <h3 class="title modal__title">Узнать ставку!</h3>
                <p class="modal__text">
                    Для получения заявок,
                    оставьте номер телефона и ваше имя.
                    Наш менеджер расскажет
                    вам все подробнее.
                </p>

                <div class="modal__input-group">
                    <input
                        v-model="name"
                        :class="{'is-invalid' : (v$.name.required.$invalid && v$.$dirty) || (v$.name.minLength.$invalid && v$.$dirty)}"
                        :disabled="isDisabled"
                        type="text"
                        placeholder="Ваше имя"
                        class="modal__input"
                        id="nameModal"
                    >

                    <div class="invalid-feedback" v-if="v$.name.required.$invalid && v$.$dirty">Обязательное поле.</div>
                    <div class="invalid-feedback" v-if="v$.name.minLength.$invalid && v$.$dirty">Минимальная длина {{v$.name.minLength.$params.min}}</div>
                </div>

                <div class="modal__input-group">
                    <input
                        v-model="phone"
                        v-maska="'+7 (###) ###-####'"
                        :class="{'is-invalid' : (v$.phone.required.$invalid && v$.$dirty) || (v$.phone.minLength.$invalid && v$.$dirty)}"
                        :disabled="isDisabled"
                        type="tel"
                        placeholder="+7 (___) ___ - __ - __"
                        class="modal__input"
                        id="phoneModal"
                    >

                    <div class="invalid-feedback" v-if="v$.phone.required.$invalid && v$.$dirty">Обязательное поле.</div>
                    <div class="invalid-feedback" v-if="v$.phone.minLength.$invalid && v$.$dirty">Неверный формат</div>
                </div>

                <label @click="polit=!polit" class="modal__label">
                    Согласие на обработку своих персональных данных
                    <input v-model="polit" class="modal__input--check" type="checkbox">
                    <div class="modal__check">
                    </div>
                    <div class="invalid-feedback invalid-feedback--polit" v-if="!polit && politDirty">Дайте согласие.</div>
                </label>

                <button @click.prevent="submitForm"  type="submit" :disabled="isDisabled" class="button modal__button">Оставить заявку</button>

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
    name: "Modal",
    data() {
        return {
            name: '',
            phone: '',
            polit: true,
            politDirty: false,
            isDisabled: false,
            counters: null
        }
    },
    computed: {
        stateModal() {
            return this.$store.getters['modal/stateModal']
        }
    },
    methods: {
        clear() {
            this.name = ''
            this.phone = ''
            this.politDirty = false
        },
        async submitForm () {
            const isFormCorrect = await this.v$.$validate()
            // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
            //console.log(this.v$.name.minLength.$params)
            if (!isFormCorrect || !this.polit) {
                this.politDirty = true
                return
            }
            // actually submit form
            this.isDisabled = true
            await axios.post('api/v1/lead.add',{
                name: this.name,
                phone: this.phone.replace(/\D/g,""),
                host: window.location.host,
                referrer: document.referrer,
                url_query_string: sessionStorage.getItem('urlQueryString'),
            }).then( response => {
                if(response.status === 201){
                    if (this.counters.ym) ym(this.counters.ym, "reachGoal", "order");
                    this.v$.$reset()
                    this.clear()
                    this.isDisabled = false
                    this.$store.dispatch('modal/modalFalse')
                    this.$store.dispatch('modal/modalThanksTrue', {
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
.v-enter-active, .v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}

.invalid-feedback {
    position:absolute;
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
