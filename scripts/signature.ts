require('dotenv').config();
import { ethers } from 'hardhat';

async function main() {

//   const message = 'const rpcURL = "https://mainnet.infura.io/YOUR_INFURA_API_KEY"';
//   const signature = '0x31ab3cb1855756201d798b28243575d4a3274872048837d1d30c0631dc4434260cc9b5d5957bd6874a57f7efee0443f4afa83834329f8c9a0674fb505dd1b8981b';
//   const signer = '0xed448c63c58efe1b8feb0dad9fa5e1a9254ec9ec'

//   const pk = ethers.utils.recoverPublicKey(ethers.utils.arrayify(ethers.utils.hashMessage(ethers.utils.arrayify(message))), signature);
//   const address = ethers.utils.computeAddress(pk)

  // 0x162cC5B9872e58a8Ce6aFfA9090E9dd38daFbA43
  //   console.log(address);

  // const hash = ethers.utils.keccak256(JSON.stringify(message))
//   const recoveredAddress = ethers.utils.verifyMessage(message, signature)
//   console.log(recoveredAddress, recoveredAddress.toLowerCase() == signer.toLowerCase())

// const { v, r, s } = ethers.utils.fromSI(req.body.signature);

    // const expanded = {
    //     r: '60819637396903234112155986417174260686415665274170078448190163668155999107989'!,
    //     s: '19019015886464264301798857218477903356734197580171981891521156151429983182351'!,
    //     v: '11146'!
    // };
    // const signature = ethers.utils.joinSignature(expanded);
    // console.log('signature', signature)
    
    const [signer, ...accounts] = await ethers.getSigners();

    const mesage = "Hello world";
    const signature = await signer.signMessage(mesage);
    console.log('signature', signature)
    console.log('signer', signer.address)
    
    const recoveredAddress = ethers.utils.verifyMessage(mesage, signature)
    console.log(recoveredAddress)
    // console.log('message', mesage)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
