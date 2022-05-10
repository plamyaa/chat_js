import { grey, white } from "./consts.js";
import Cookies from "js-cookie";
import { configTime, differentEmail } from "./utils.js";
import { UI } from "./consts.js";
import { tryParse } from "./utils.js";

    UI.CONTAINER.style.display = "none";
    show.style.display = "block";
    document.body.style.background = grey;
}
export function hideModal(show) {
    UI.CONTAINER.style.display = "flex";
    show.style.display = "none";
    document.body.style.background = white;
}
export function createMessage (formValue, name, date, email) {
    const messageBlock = document.createElement("div");
    messageBlock.classList.add("chat-window__message");

    if (differentEmail(email))
        messageBlock.classList.add("message-he");
    else
        messageBlock.classList.add("message-my");
    messageBlock.append(UI.TEMPLATE.content.cloneNode(true));
    messageBlock.firstElementChild.textContent = name + ': ' + formValue;
    messageBlock.lastElementChild.textContent = configTime(date);
    return messageBlock;
}

export function showMessagesHistory(len) {
    const template = localStorage.getItem("messagesHistory");
    const messagesHistory = tryParse(template);
    const lenOfMsg = messagesHistory.length - 1;
    
    for (let i = lenOfMsg - len; i > lenOfMsg - len - 20; i--) {
        UI.CHAT_WINDOW.prepend(createMessage(messagesHistory[i].text, messagesHistory[i].user.name, new Date(messagesHistory[i].createdAt), messagesHistory[i].user.email)); 
        UI.CHAT.scrollTop += UI.CHAT_WINDOW.firstChild.clientHeight - 48;
    }
}

export function checkAutoriztion(){
    const email = Cookies.get("email");
    const token = Cookies.get("token");
    const name = Cookies.get("myName");
    if (!email) {
        alert("Пожалуйста авторизуйтесь");
        return 0;
    }
    else if (!token) {
        alert("Пожалуйста введите токен");
        return 0;
    }
    else if (!name) {
        alert("Пожалуйста введите имя в настройках");
        return 0;
    }
    return 1;
}

export function isAutorized() {
    const email = Cookies.get("email");
    if (!email) {
        UI.EXIT_BUTTON.textContent = "Войти";
        return false;
    }
    else {
        UI.EXIT_BUTTON.textContent = "Выйти";
        return true;
    }
} 