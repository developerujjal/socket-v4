
// const userName = prompt('What is your username?');
// const password = prompt('What is your password');

const userName = 'Barry';
const password = 'x';


const socket = io();

socket.on('connect', () => {
    console.log(socket.id)
});

// nsList event for get the namespace from server
socket.on('nsList', (nsData) => {
    console.log(nsData)

    const namespacesDiv = document.querySelector('.namespaces');
    nsData.forEach((ns) => {
        namespacesDiv.innerHTML += `
                <div class="namespace" ns=${ns.endpoint}>
                    <img src=${ns.image}>
                </div>
        `;
    });


    Array.from(document.getElementsByClassName('namespace')).forEach((element) => {
        console.log(element)
        element.addEventListener('click', (e) => {
            const nsEndPoint = element.getAttribute('ns');
            console.log(nsEndPoint)

            const clickedNs = nsData.find(ns => ns.endpoint === nsEndPoint);
            console.log(clickedNs)

            const roomListDiv = document.querySelector('.room-list');

            roomListDiv.innerHTML = '';
            
            clickedNs.rooms.forEach((room) => {
                roomListDiv.innerHTML += `
                        <li><span class="glyphicon glyphicon-globe"></span>${room.roomTitle}</li>
                `
            } )
        })
    });


});


