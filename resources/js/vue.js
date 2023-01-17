import {createApp} from "vue";
import {store} from "./store";
import Maska from "maska";
import QuizApp from "./components/Quiz.vue";
import LastStep from "./components/LastStep.vue";
import ButtonModal from "./components/ButtonModal.vue";
import ModalApp from "./components/Modal.vue";
import ThanksApp from "./components/Thanks.vue";
import ThanksQuiz from "./components/ThanksQuiz.vue";

import 'vue-select/dist/vue-select.css';

const app = createApp({
    components: {
        QuizApp,
        LastStep,
        ButtonModal,
        ModalApp,
        ThanksApp,
        ThanksQuiz
    },

    created: function(){

        if(!sessionStorage.getItem('urlQueryString'))
            sessionStorage.setItem('urlQueryString', window.location.href);
    }
});

app.use(store)
app.use(Maska);

app.mount("#app");
