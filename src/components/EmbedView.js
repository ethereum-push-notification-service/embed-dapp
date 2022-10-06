import React from 'react';
import styled from 'styled-components';
import { Open as OpenIcon } from '@styled-icons/fluentui-system-filled/Open'
import { Close as CloseIcon } from '@styled-icons/evil/Close';
import { Warning } from '@styled-icons/entypo/Warning'
import { NotificationItem } from "@pushprotocol/uiweb";
import ConnectButton from "./connect";
import Loader from './Loader';
import NoNotifications from './NoNotifications';


const EmbedView = ({
    isLoading,
    headerText,
    notifications,
    onCloseHandler,
    account,
    isNetworkSupported,
    config
}) => {
    return (
        <ViewContainer>
            <ViewHeader>
              <HeaderLink href={config?.appLink} target="_blank" title={config?.appLink}>
                  <span>{headerText}</span>
                  <OpenIcon className="view-link-icon" size="20"/>
              </HeaderLink>

              <CloseIcon className="view-close-icon" size="30" onClick={onCloseHandler}/>
            </ViewHeader>
            <ViewBody>
                {!account ? (
                    <ConnectPlaceholder>
                        <ConnectButton />
                    </ConnectPlaceholder>
                ) : null}


                {isNetworkSupported && !isLoading ? (
                    <NotificationsSection>
                        {(Array.isArray(notifications) && notifications.length > 0) ? (
                            notifications.map((oneNotification, i) => {
                                const {
                                    cta,
                                    title,
                                    message,
                                    app,
                                    icon,
                                    image,
                                    url,
                                    blockchain
                                } = oneNotification;
                                // render the notification item
                                return (
                                    <NotificationItem
                                        key={i}
                                        notificationTitle={title}
                                        notificationBody={message}
                                        cta={cta}
                                        app={app}
                                        icon={icon}
                                        image={image}
                                        url={url}
                                        chainName={blockchain}
                                    />
                                );
                            })
                        ) : <NoNotifications />
                        }
                    </NotificationsSection>
                ) : null}

                {!isNetworkSupported ? (
                    <WarningMessage>
                      <Warning color="orange" height={26} width={26} />
                      <span>Unsupported Network!</span>
                    </WarningMessage>
                ) : null}

                {isLoading ? <Loader show /> : null}
            </ViewBody>
        </ViewContainer>
    );
};

const ViewContainer = styled.div`
    background-color: #f7fafc;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const ViewHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background-color: #ffffff;
    min-height: 4rem;
    border-bottom: 1px solid #e4e8ea;

    & svg {
        cursor: pointer;
    }

    & svg.view-close-icon {
       transition: transform .2s;
    }

    & svg.view-close-icon:hover {
        color: #1e1e1eb5;
        transform: scale(1.2);
    }
`;

const ViewBody = styled.main`
    flex-grow: 1;
    overflow-y: auto;
    padding: 15px;
    position: relative;
`;

const HeaderLink = styled.a`
    color: #000;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: bold;

    & svg {
        margin-left: 5px;
    }

    &:hover {
        color: #2b43d8;
    }
`

const ConnectPlaceholder = styled.div`
    display: flex;
    justify-content: center;
`;

const NotificationsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const WarningMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
      margin-left: 6px;
  }
`;

EmbedView.defaultProps = {
    headerText: 'Notifications'
};

export default EmbedView;