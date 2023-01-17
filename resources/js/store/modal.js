import noJump from "../assets/noJump";

export default {
    namespaced: true,
    state() {
        return {
            modal: false,
            modalThanks: false,
            thanksQuiz: false,
            modalThanksContent: {
                title: '',
                text: ''
            },
            main: true,
            quiz: true,
            lastStep: false,
        }
    },
    getters: {
        stateMain(state) {
          return state.main
        },
        stateThanksQuiz(state) {
          return state.thanksQuiz
        },
        stateLastStep(state) {
            return state.lastStep
        },
        stateModalThanksContent(state) {
            return state.modalThanksContent
        },
        stateQuiz(state) {
            return state.quiz
        },
        stateModal(state) {
            return state.modal
        },
        stateModalThanks(state) {
            return state.modalThanks
        }
    },
    mutations: {
        THANKS_QUIZ_TRUE(state) {
            state.thanksQuiz = true
        },
        THANKS_QUIZ_FALSE(state) {
            state.thanksQuiz = false
        },
        MAIN_TRUE(state) {
            state.main = true
        },
        MAIN_FALSE(state) {
            state.main = false
        },
        LAST_STEP_TRUE(state) {
            state.lastStep = true
        },
        LAST_STEP_FALSE(state) {
            state.lastStep = false
        },
        QUIZ_TRUE(state) {
            state.quiz = true
        },
        QUIZ_FALSE(state) {
            state.quiz = false
        },
        MODAL_TRUE(state) {
            state.modal = true
        },
        MODAL_FALSE(state) {
            state.modal = false
        },
        MODAL_THANKS_TRUE(state) {
            state.modalThanks = true
        },
        MODAL_THANKS_FALSE(state) {
            state.modalThanks = false
        }
    },
    actions: {
        modalTrue({ commit }) {
            commit('MODAL_TRUE')
            noJump()
        },
        modalFalse({ commit }) {
            commit('MODAL_FALSE')
            document.body.style = ''
        },
        modalThanksTrue({ state, commit }, modalThanksContent) {
            state.modalThanksContent.title = modalThanksContent.title
            state.modalThanksContent.text = modalThanksContent.text
            commit('MODAL_THANKS_TRUE')
            noJump()
        },
        modalThanksFalse({ commit }) {
            commit('MODAL_THANKS_FALSE')
            document.body.style = ''
        }
    }
}
