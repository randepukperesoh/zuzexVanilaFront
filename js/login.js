import { socket } from "./sokcet.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const login = () => {
    const loginBtn = document.querySelector('.loginBtn');
    const login = document.querySelector('.login')
    const userInfo = document.querySelector('.userInfo')

    const firstName = ['паук', 'лев', 'волк', 'мыш','червь','шмель','таракан','жук'];
    const secondName = ['радиоактивный','зеленый','маленький','веселый','большой','мертвый','живой','волосатый','новый','старый'];

    const myUser = {
        id: uuidv4(), 
        idImg: Math.floor(Math.random()*127), 
        name: secondName[Math.floor(Math.random()*secondName.length)] + ' ' 
            + firstName[Math.floor(Math.random()*firstName.length)]
    }

    loginBtn.addEventListener('click', () => {
        socket.emit('join', myUser)
        login.remove()
    })
    userInfo.insertAdjacentHTML('afterbegin', `
        <img width={24} height={24} src=https://randomfox.ca/images/${myUser.idImg}.jpg/>
        <span className='nameLabel'>${myUser.name}</span>
    `)
    return myUser
}