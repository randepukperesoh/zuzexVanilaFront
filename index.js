import { modal } from './js/modal.js'
import { login } from './js/login.js'
import { messagesCreate } from './js/messagesCreate.js'
import { newMessage } from './js/newMessage.js'
import { socket } from "./js/sokcet.js"


const myUser = login()

let users = []
let messages = []
socket.on('message', (data) => {
    messages.push(data)
    const event = new CustomEvent('reqMessage');
    document.dispatchEvent(event);
})
socket.on('getDefaultValues', (data) => {
    data.users.forEach(user => {
        users.push(user)
    });
    messages.push(...data.messages);
    modal(users)
    const event = new CustomEvent('getDefaultValues');
    document.dispatchEvent(event);
})
socket.on('allUsers', (data) => {
    users = [];
    users = data;
    modal(users)
})
messagesCreate(myUser, messages)

newMessage(myUser, messages)


const handleBeforeUnload = () => {
    socket.emit('disc', myUser.id);
};

window.addEventListener('beforeunload', handleBeforeUnload);