import { socket } from "./sokcet.js"

export const newMessage = (myUser, messages) => {
    const textInput = document.querySelector('.textInput')
    const sendBtn = document.querySelector('.sendBtn')
    const fileInput = document.querySelector('.fileInput input')
    let text = '';
    const event = new CustomEvent('newMessage');
    const handlePushMessage = () => {
        text = textInput.value;
        socket.emit('sendMessage', {user: myUser, message: text})
        messages.push({user: myUser, message: text})
        document.dispatchEvent(event);
        textInput.value = ''
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result;
            socket.emit('sendMessage', {user: myUser, type: 'img', message: base64Image})
            messages.push({user: myUser, message: base64Image, type: 'img'})
            document.dispatchEvent(event);
            event.target.value = null;
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    fileInput.addEventListener('change', handleFileChange)
    sendBtn.addEventListener('click', () => handlePushMessage() )
}