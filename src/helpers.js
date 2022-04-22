const Helpers = {
  createMsgPayload({ msg, ...otherParams}) {
    return {
        msg,
        channel: 'EPNS_SDK_CHANNEL', // this has to be picked from the SDK
        ...otherParams 
    };
  },
  pusblishMsgToSDK(msgPayload) {
    try {
        window.top.postMessage(JSON.stringify(msgPayload), '*');
    } catch (error) {
        console.warn('[embed-dapp] something went wrong while passing msg to SDK');
    }
  },
}

export default Helpers;