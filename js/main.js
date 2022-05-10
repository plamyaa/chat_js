import { hideModal, showModal, showMessagesHistory, checkAutoriztion, isAutorized} from "./view.js";
import Cookies from 'js-cookie';
import { sendMessage } from "./socket.js";
import {getResponse, receiveMessages, sendEmail} from "./requests.js"
import { UI } from "./consts.js"
import { deleteCookie } from "./utils.js";

isAutorized();
receiveMessages();

UI.EXIT_BUTTON.addEventListener("click", () => {
    if (isAutorized()) {
        deleteCookie();
        UI.EXIT_BUTTON.textContent = "Войти";
    }
    showModal(UI.MODAL_AUTORIZATION)
});

UI.ENTER_CODE.addEventListener("click",  () => {
    hideModal(UI.MODAL_AUTORIZATION);
    showModal(UI.MODAL_CONFIRMATION);
});

UI.MODAL.AUTORIZATION.SEND_BUTTON.addEventListener("click", () => {
    if (UI.MODAL.AUTORIZATION.TEXT.value.includes('@')){
        const email = UI.MODAL.AUTORIZATION.TEXT.value;
        Cookies.set("email", email)
        hideModal(UI.MODAL_AUTORIZATION);
        showModal(UI.MODAL_CONFIRMATION);
        sendEmail(email);
    }
    else {
        alert("Введите корректный email");
    }
    UI.MODAL.AUTORIZATION.TEXT.value = "";
});

UI.MODAL.CONFIRMATION.SEND_BUTTON.addEventListener("click", () => {
    if (UI.MODAL.CONFIRMATION.TEXT.value) {
        const token = UI.MODAL.CONFIRMATION.TEXT.value;
        Cookies.set("token", token);
        hideModal(UI.MODAL_CONFIRMATION);
        showModal(UI.MODAL_SETTINGS);
    }
    else {
        alert("Введите токен");
    }
    UI.MODAL.CONFIRMATION.TEXT.value = "";
});

UI.MODAL.SETTINGS.SEND_BUTTON.addEventListener("click", () => {
    if (UI.MODAL.SETTINGS.TEXT.value) {
        const name = UI.MODAL.SETTINGS.TEXT.value;
        Cookies.set("myName", name);
        hideModal(UI.MODAL_SETTINGS);
        getResponse(name);
    }
    else {
        alert("Введите имя");
    }
    UI.MODAL.SETTINGS.TEXT.value = "";
});

UI.SETTINGS_BUTTON.addEventListener("click", () => showModal(UI.MODAL_SETTINGS));
UI.MODAL.SETTINGS.EXIT.addEventListener("click", () => hideModal(UI.MODAL_SETTINGS));
UI.MODAL.AUTORIZATION.EXIT.addEventListener("click", () => hideModal(UI.MODAL_AUTORIZATION));
UI.MODAL.CONFIRMATION.EXIT.addEventListener("click", () => hideModal(UI.MODAL_CONFIRMATION));

UI.SEND_BUTTON.addEventListener("click", () => {
    if (UI.SEND_TEXT.value && checkAutoriztion()) {
        sendMessage(UI.SEND_TEXT.value);        
    }
    UI.SEND_TEXT.value = "";
});

let counter = 0;
UI.CHAT.addEventListener("scroll", () => {
    if (UI.CHAT.scrollTop === 0) {
        counter++;
        showMessagesHistory(20 * counter);
    }
});