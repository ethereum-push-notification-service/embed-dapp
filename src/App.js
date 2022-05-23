import './App.css';
import { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { utils, api } from "@epnsproject/frontend-sdk-staging";
import EmbedView from './components/EmbedView';
import { SDKContext } from './context';
import Helpers from './helpers';
import CONFIG from './config';
import { DEFAULT_NOTIFICATIONS } from './data';


const PAGINATION_PARAMS = {
  page: 1,
  itemsPerPage: 20,
};

function App() {
  const { active, account, chainId } = useWeb3React();
  const sdkContext = useContext(SDKContext);
  const [config, setConfig] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNetworkSupported, setIsNetworkSupported] = useState(false);

  const onCloseHandler = () => {
    Helpers.pusblishMsgToSDK(
      Helpers.createMsgPayload({
        msg: 'IFRAME is closed',
        topic: 'EPNS_SDK_EMBED_CHANNEL_TOPIC_IFRAME_APP_CLOSED'
      })
    );
  };


  useEffect(() => {
    setConfig(CONFIG[chainId])
    setIsNetworkSupported(!!CONFIG[chainId]);
  }, [chainId]);


  useEffect(() => {
    const bootstrap = async () => {
      setIsLoading(true);
      try {
        // should we fetch notifications only if the user is subscribed to the channel
        const { results } = await api.fetchNotifications(
          account,
          PAGINATION_PARAMS.itemsPerPage,
          PAGINATION_PARAMS.page,
          CONFIG[chainId].API_BASE_URL
        )
  
        const response = utils.parseApiResponse(results);
        // for testing
        // let response = utils.parseApiResponse([
        //   ...results,
        //   ...DEFAULT_NOTIFICATIONS,
        // ]);
  
        setNotifications(response || []);
      } catch (e) {
        console.error('something went wrong: ', e);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (active && account && chainId && config) {
      bootstrap();
    }
  }, [active, account, chainId, config, sdkContext.channelAddress]);

  return (
    <EmbedView
      isLoading={isLoading}
      account={account}
      headerText={sdkContext.headerText}
      config={config}
      notifications={notifications}
      onCloseHandler={onCloseHandler}
      isNetworkSupported={isNetworkSupported}
    />
  );
}

export default App;
