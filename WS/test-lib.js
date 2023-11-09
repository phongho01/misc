const publicKeyToAddress = require('ethereum-public-key-to-address')
const privateKeyToPublicKey = require('ethereum-private-key-to-public-key')

const DEFAULT_PRIVATE_SHARE_1 = '8cdabe9d4c8762205ad4f49d9138d8378ecbc0ebbe7b6a5b941d9f50a4eedd97';
const DEFAULT_PRIVATE_SHARE_2 = '10dabe9d4c8762205ad4f39d9138d8378ecbc0ebbe7b6a5b941d9f50a5eedd97';
const DEFAULT_PUBLIC_KEY = '034839ae116a3ba4621bae1cb40dc398f3c4a72c1cc1217eb2b932aeaa2a2fac5d';
const DEFAULT_DERIVED_PUBLIC_KEY = '0283e092dd4efc305010557e6de115aa6a23fb2c02f78acd4108c0b2f68b3feedc';

// console.log('PRIVATE SHARE 1 => PUBLIC SHARE 1: ', privateKeyToPublicKey(DEFAULT_PRIVATE_SHARE_1).toString('hex'));
// console.log('PRIVATE SHARE 2 => PUBLIC SHARE 2: ', privateKeyToPublicKey(DEFAULT_PRIVATE_SHARE_2).toString('hex'));
console.log('Address', publicKeyToAddress("0298095f5d20095176f14acaaaf31d1f41c7b9b8a81fb1e4ef65175e6079d62790"))


