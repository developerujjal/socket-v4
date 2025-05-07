
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
    const lastNs = localStorage.getItem('lastNs');

    const namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = '';
    nsData.forEach((ns) => {
        namespacesDiv.innerHTML += `
                <div class="namespace" ns=${ns.endpoint}>
                    <img src=${ns.image}>
                </div>
        `;
    });


    Array.from(document.getElementsByClassName('namespace')).forEach((element) => {
        // console.log(element)
        element.addEventListener('click', (e) => {
           joinNs(element, nsData)
        })
    });

    // if lastNs is set the grab that element instead of 0
    joinNs(document.getElementsByClassName('namespace')[0], nsData);


});


