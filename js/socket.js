import Cookies from 'js-cookie';
import { createMessage } from './view.js';
import { UI } from './consts.js';
import { tryStringify, tryParse } from './utils.js';

export function joinOnline() {
    window.socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${Cookies.get("token")}`);
    socket.addEventListener("message", (event) => {
        const messageData = tryParse(event.data);
        console.log(event.data);
        UI.CHAT_WINDOW.append(createMessage(messageData.text, messageData.user.name, new Date(messageData.createdAt), messageData.user.email));
        UI.CHAT.scrollTop += 100000;
    });
    socket.addEventListener("error", ((error) => alert(error.message)));
    socket.addEventListener("close", joinOnline);
}

export function sendMessage(message) {
    socket.send(tryStringify({ text: `${message}` }));
}