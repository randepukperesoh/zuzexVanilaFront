export const modal = (users) => {
    const infoBtn = document.querySelector('.usersPanelWrapper img') 
    const main = document.querySelector('main')
    const numberOfUser = document.querySelector('.usersPanelWrapper div span')
    numberOfUser.textContent = users.length;

    infoBtn.addEventListener('click', () => {

        const modal = `<div class='modalWrapper'>
                <div class='modal'>
                    <div class='usersList'>
                        <span>Все пользователи</span>
                        ${users.map( user => `<div class='user'>
                        <img width='24' height='24' src='https://randomfox.ca/images/${user.idImg}.jpg' alt="" />  
                        <span>${user.name}</span>
                      </div>`)}

                    </div>
                    
                </div>
            </div>`
        main.insertAdjacentHTML("beforebegin", modal)
        const modalWrapper = document.querySelector('.modalWrapper')
        const modalElement = document.querySelector('.modal')
        modalElement.addEventListener('click', (e) => {e.stopPropagation()})
        modalWrapper.addEventListener('click', ()=> {
            modalWrapper.remove()
        })
})
}
