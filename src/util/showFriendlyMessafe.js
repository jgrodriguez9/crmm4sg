const { ERR_BAD_REQUEST } = require("../common/messages")

const showFriendlyMessafe = (serverCode) => {
    switch(serverCode){
        case 'ERR_BAD_REQUEST':
            return ERR_BAD_REQUEST;
        default:
            return serverCode;
    }
}

export default showFriendlyMessafe