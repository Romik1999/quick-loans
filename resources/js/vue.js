import {createApp} from "vue";
import {store} from "./store";
import Maska from "maska";
import LastStep from "./components/LastStep.vue";
import ButtonModal from "./components/ButtonModal.vue";
import ButtonModalReview from "./components/ButtonModalReview.vue";
import ModalReviewsApp from "./components/ModalReview.vue";
import ModalApp from "./components/Modal.vue";
import ThanksApp from "./components/Thanks.vue";
import FormCalcApp from "./components/FormCalc.vue";

import 'vue-select/dist/vue-select.css';

const app = createApp({
    components: {
        LastStep,
        ButtonModal,
        ButtonModalReview,
        ModalApp,
        ModalReviewsApp,
        ThanksApp,
        FormCalcApp
    },

    created: function(){

        if(!sessionStorage.getItem('urlQueryString'))
            sessionStorage.setItem('urlQueryString', window.location.href);
    }
});

app.use(store)
app.use(Maska);

app.mount("#app");
