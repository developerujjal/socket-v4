class Room{
    constructor(roomId, roomTitle, nameSpaceId, privateRoom = false ){
        this.roomId = roomId,
        this.roomTitle = roomTitle,
        this.nameSpaceId = nameSpaceId,
        this.privateRoom = privateRoom,
        this.history = [];
    };

    addMessage(message){
        this.history.push(message);
    };

    clearHistory(){
        this.history = [];
    };

};

module.exports = Room;

