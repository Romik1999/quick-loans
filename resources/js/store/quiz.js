export default {
    namespaced: true,
    state() {
        return {
            questionAnswer:[
                {
                    type: 'radio',
                    question : 'Сумма кредита?',
                    answers: [
                        'менее 200 тыс. рублей',
                        'от 200 тыс. до 500 тыс. рублей',
                        'от 500 тыс. до 1 млн. рублей',
                        'от 1 млн. до 10 млн. рублей',
                        'более 10 млн. рублей'
                    ]
                },
                {
                    type: 'radio',
                    question : 'Как срочно нужен кредит?',
                    answers: [
                        'Сегодня',
                        'от 1 до 3 дней',
                        'от 3 до 7 дней',
                        'Нет срочности'
                    ]
                },
                {
                    type: 'radio',
                    question : 'Откуда Вы?',
                    answers: [
                        'Москва',
                        'Московская область',
                        'Другой район'
                    ]
                },
                {
                    type: 'radio',
                    question : 'Имеющиеся документы?',
                    answers: [
                        'Паспорт',
                        'Паспорт + 2-ой документ'
                    ]
                },
                {
                    type: 'radio',
                    question : 'Возраст?',
                    answers: [
                        'Менее 25 лет',
                        'от 25 до 55 лет',
                        'Старше 55 лет'
                    ]
                },
                {
                    type: 'radio',
                    question : 'Цель кредита?',
                    answers: [
                        'Потребительский',
                        'Автокредит',
                        'Рефенансирование текущих кредитов',
                        'Другое'
                    ]
                },
                {
                    type: 'radio',
                    question : 'В каком формате хотите оформление?',
                    answers: [
                        'В банке',
                        'У частных инвесторов',
                        'Под залог'
                    ]
                },
                {
                    type: 'radio',
                    question : 'Вам предварительно одобрили ставку <span>6,5%</span> годовых. Готовы получить деньги',
                    answers: [
                        'В банке',
                        'У частных инвесторов',
                        'Под залог'
                    ]
                }
            ],
            data: [],
            step: 0
        }
    },
    getters: {
        stateQuiz(state) {
            return state.quiz
        },
        stateQuestionAnswer(state){
            return state.questionAnswer
        },
        stateStep(state){
            return state.step
        },
        stateData(state){
            return state.data
        }
    },
    mutations: {
        CHANGE_STEP(state, val) {
            state.step += val
        },
        SET_DATA(state, data){
            state.data[state.step] = data
        },
        CLEAR_DATA(state){
            state.data = []
            state.step = 0
        }
    },
    actions: {
        prevNext({state, commit}, value) {
            console.log(state.data)
            if (value <= 0) {
                commit('CHANGE_STEP', value)
            } else {
                if (!state.data[state.step] || state.data[state.step].answer === '') {
                    alert('Выберите вариант ответа!')
                    return false
                }
                if (state.step === state.questionAnswer.length - 1) {
                    commit('modal/QUIZ_FALSE', null, { root: true })
                    commit('modal/LAST_STEP_TRUE', null, { root: true })
                    return false
                }
                commit('CHANGE_STEP', value)
            }

        },
        setData({state, commit}, data) {
            commit('SET_DATA', data)
        },
        clearData({commit}){
            commit('CLEAR_DATA')
        }
    }

};
