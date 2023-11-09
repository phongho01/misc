import { ethers } from 'ethers';
const publicKeyToAddress = require('ethereum-public-key-to-address');

const RPC_URL = 'https://rpc-kura.cross.technology';
export const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
let privateKey = '0dfb8f0fc41906a7a5ba479c9fe5b1f4cac9fb44084a392e0003bc88e3e110f9';
let wallet = new ethers.Wallet(privateKey);

let message = 'Hello World';

// Sign the string message
const getSignature = async () => {
  const message = 'hello world';
  const hash = ethers.utils.hashMessage(message);

  const DERIVED_PUBLIC_KEY = '03b31cd1e0e7497cb0f4478277e3d00616155170e9f6b156faebb8c91e93ebed91';
  const address = publicKeyToAddress(DERIVED_PUBLIC_KEY);

  const r = 'cd1c110d1b2a3be3e07d4c7b45c304bf34b22d027bb6eb30f5cffba7c479d5ee';
  const s = '08f59b5d67e2dfdc5f94fb57ba1530a9392d964ddbbf90d0b60c7060ec521093';
  const v = '1c';
  const signature = '0x' + r + s + v;

  console.log({
    message,
    address,
    signature,
  });

  console.log('message:', message);
  console.log('signature:', signature);
};

getSignature();
