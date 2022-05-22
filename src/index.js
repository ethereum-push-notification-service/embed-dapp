import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import { SDKContext } from './context';
import Helpers from './helpers';
// import Loader from './components/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));

function getLibrary(provider) {
  const gottenProvider = new ethers.providers.Web3Provider(provider, "any"); // this will vary according to whether you use e.g. ethers or web3.js
  return gottenProvider;
}

const MainAPP = () => {
  const [sdkConfig, setSDKConfig] = useState({});
  // const [initLoading, setInitLoading] = useState(
  //   process.env.REACT_APP_TYPE === 'shell' ? false :true
  // );

  function onMessageEventListener(evt) {
    try {
      if (typeof evt.data !== 'string') return null;

		  const publishedMsg = JSON.parse(evt.data);

      if (publishedMsg.channel === 'EPNS_SDK_EMBED_CHANNEL') {
        if (publishedMsg.topic === 'EPNS_SDK_EMBED_CHANNEL_TOPIC_SDK_CONFIG_INIT') {
          setSDKConfig(publishedMsg.msg);
          // setInitLoading(false);
        }
      }


    } catch (err) {
      console.error('something went wrong parsing IFRAME message to the APP.')
    }
  }
  
  useEffect(() => {
    window.addEventListener('message', onMessageEventListener, false);

    const payload = Helpers.createMsgPayload({
      msg: 'App loaded',
      topic: 'EPNS_SDK_EMBED_CHANNEL_TOPIC_IFRAME_APP_LOADED'
    });

    Helpers.pusblishMsgToSDK(payload);

    return () => {
      window.removeEventListener('message', onMessageEventListener, false);
    }
  }, []);

  return (
    <React.StrictMode>
      <SDKContext.Provider value={sdkConfig}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
          {/* <Loader show={initLoading} /> */}
        </Web3ReactProvider>
      </SDKContext.Provider>
    </React.StrictMode>
  );
};

root.render(<MainAPP />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
