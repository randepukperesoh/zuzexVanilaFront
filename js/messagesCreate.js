export const messagesCreate = (myUser, messages) => {
    const chat = document.querySelector('.chatWrapper');

    document.addEventListener('reqMessage', newMessage);
    document.addEventListener('newMessage', newMessage);
    document.addEventListener('getDefaultValues', newMessage);

    function loadImages(message) {
        return new Promise((resolve, reject) => {
            if (message.type === 'img') {
                const img = new Image();
                img.src = message.message;
                img.onload = function() {
                    resolve(img);
                };
            } else {
                resolve('');
            }
        });
    }

    function newMessage() {
        chat.innerHTML = ''; 

        messages.forEach((message, i) => {
            const isMyUser = message.user.id === myUser.id;
            const messageContent = `
                <div class='messageWrapper ${isMyUser ? 'my' : 'another'}'>
                    ${!isMyUser ? `<img width='24' height='24' class='avatar' alt='avatar' src='https://randomfox.ca/images/${message.user.idImg}.jpg'/>`: ''}
                    <span class='userLabel'>${message.user.name}</span>
                    <p class='message'>${message.message}</p>
                </div>`;

            chat.insertAdjacentHTML('beforeend', messageContent);
            const arrMesage = Array.from(document.querySelectorAll('p.message'))
            if(message.type == 'img'){
                loadImages(message).then(image => {
                    arrMesage[i].replaceWith(image)
                    chat.scrollTo(0, chat.scrollHeight);
                });
            }
            else{
                chat.scrollTo(0, chat.scrollHeight);
            }
            
        });
    }
}
