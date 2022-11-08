/**
 * Define the properties for the metamask connnector
 */
import { InjectedConnector } from '@web3-react/injected-connector'

const SUPPORTED_CHAIN_IDS = [
  1, //for mainnet
  5, // for goerli
  137, // for polygon mainnet
  80001, // for polygon mumbai
];

export const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAIN_IDS })

