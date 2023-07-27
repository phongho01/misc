import { ethers } from 'ethers';
import ERC20_ABI from './ABI.json';

const CONTRACT_ADDRESS = '0x1ffB5A1D759C67084ea583C99891b1be34d323d3';
const RPC_URL = 'wss://rpc-kura.cross.technology';

const provider = new ethers.providers.WebSocketProvider(RPC_URL);

const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, provider);

contract.on('Transfer', (from, to, value, event) => {
  console.log('event: ', event);
});

// mint();