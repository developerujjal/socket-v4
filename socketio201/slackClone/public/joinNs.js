const joinNs = (element, nsData) => {
    const nsEndPoint = element.getAttribute('ns');
    // console.log(nsEndPoint)

    const clickedNs = nsData.find(ns => ns.endpoint === nsEndPoint);
    // console.log(clickedNs)

    const roomListDiv = document.querySelector('.room-list');

    roomListDiv.innerHTML = '';

    clickedNs.rooms.forEach((room) => {
        roomListDiv.innerHTML += `
                <li><span class="glyphicon glyphicon-globe"></span>${room.roomTitle}</li>
        `
    } );

    localStorage.setItem('lastNs', nsEndPoint)
};