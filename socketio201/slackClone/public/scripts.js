
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
                <div class="namespace" ns=${ns.name}>
                    <img src=${ns.image}>
                </div>
        `;


    });
});


