import Cookies from "js-cookie";

export function differentEmail(messageEmail) {
    return (messageEmail != Cookies.get("email")) ? true : false;
}

export function configTime(date){
    return String(date).slice(16, 21);
}

export function tryStringify(obj) {
    try {
        return JSON.stringify(obj);
    }
    catch (error) {
        alert("Error " + error.name + ':' + error.message + '\n' + error.stack);
        return null;
    }
}

export function deleteCookie() {
    Cookies.remove("myName");
    Cookies.remove("email");
    Cookies.remove("token");
}

export function tryParse(obj){
    try {
        return JSON.parse(obj);
    }
    catch (error) {
        alert("Error " + error.name + ':' + error.message + '\n' + error.stack);
        return null;
    }
}