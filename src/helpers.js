const Helpers = {
  createMsgPayload(payload = {}) {
    return {
      channel: 'EPNS_SDK_EMBED_CHANNEL',
      ...payload
    };
  },
  pusblishMsgToSDK(msgPayload) {
    try {
        window.top.postMessage(JSON.stringify(msgPayload), '*');
    } catch (error) {
        console.warn('[embed-dapp] something went wrong while passing msg to SDK', error);
    }
  },
}

export default Helpers;