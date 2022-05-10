import Cookies from 'js-cookie';
import { showMessagesHistory } from './view.js';
import { UI } from "./consts.js"
import { tryStringify } from './utils.js';
import { joinOnline } from './socket.js';

export async function getResponse (myName) {
    const json = tryStringify({ name: myName });
    const token = Cookies.get("token");
    try {
        fetch(UI.USER_API, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: json,
        });
    }
    catch (error) {
        alert("Error " + error.name + ':' + error.message + '\n' + error.stack);
    }
}

export async function sendEmail(eMail) {
    const json = tryStringify({ email: eMail });
    try {
        fetch(UI.USER_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: json,
        });
    }
    catch (error) {
        alert("Error " + error.name + ':' + error.message + '\n' + error.stack);
    }
};

export async function receiveMessages() {

    try {
        const response = await fetch(UI.MESSAGES_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        const json =  await response.json();
        const messagesHistory = tryStringify(json.messages);
        console.log(messagesHistory);
        localStorage.setItem("messagesHistory", `${messagesHistory}`);
        showMessagesHistory(0);
        joinOnline();
        UI.CHAT.scrollTop += 10000;
    }
    catch(error) {
        alert("Error " + error.name + ':' + error.message + '\n' + error.stack);
    }
} 