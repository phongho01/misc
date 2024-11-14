const { PublicKey, Connection } = require("@solana/web3.js");

const addresses = [
  "F3R4LZSpJYjis9TAK46kxb4iCU9FYDQxECBgKRAjg1Yp",
  "2i84jsELgE9xEpwGFVcGG7qwCnUVXZi3kt3B7Wx2ZzAr",
  "2kV6cWJyJdFeTW1nVq3EyhRV2Z3vYo8PmYiKSdMMtZaX",
  "E3eThhszFsvfJRpMGXpueUmmEzU5VM56bir39WnAECCe",
  "6SP1yYJipHJyCMbVxh6BBRHs4QFfShXDLiSfd6UEohr3",
  "5z9Wqio8vEkxbkk49Hu2u1Kx32ovgPFk3py4C5FJNSRx",
  "F7A5weUixbeiW6ncn14QGf8MMpJaycSHpSrZW6xXSSn6",
  "9rwrJuRhfLaBntcT4R7fFGN5F2CBUv8LquPQDrDzWmSi",
  "DK6zRLfbqcCudL3TxKxY5Yjn1izUvuorNAVgtH2kejbZ",
  "AF2WT6358kUrpWUmA3dkpwZz6woZBr1WriRmYphqF8Ch",
  "93F1uh9HYZT54rj1QumMrxujrzCrvYD54teAqHzrEPmZ",
  "36diqjRtoTRMQ67GGhpd21HTzrRKgviTeve4Ar9EUMeA",
  "32P9ofb1sEZAeQveEiRF7yfNX68XQitAKVMuDFd6Ld7Q",
  "CfkGQYX9wa689CDAvB7qVuVtfN6puLqChZVAEx72NUYq",
  "8jfccBvj468Vf9WUaeZkokS1Z6eKUEujag8CUiqFqhut",
  "J4DzGqZSH8iC5L7nkP5pPE1kTPCqdW6HMZAYRzTPX2yP",
  "4m8eUGkDXm3cm1BNoCcSauNeQg614r8KJAuSDLrQVC1e",
  "6aGkvUBg1a28pg65ADztc5VpZNJLY7WzvrEw8P4U46po",
  "7u1L7WUVTMtRCBGEN1prKjGANjdEvEhfht2A6HwLv7cw",
  "BLbMwPEiBsGXDzwdfSkT14g3NXSJpNbC2eoWMydYg82u",
  "3xRXDRfzNiWkxFfmu1sr5t9xkurmgH8fUv7vsUDUZq5v",
  "4TiaFySDq245dNRQyHq98rtGb8uiQi3ZhzpNaDHmu5Vi",
  "6pSch4YgMW4CmjZTLJZaLRCWzNakN9Q8Uwg1poV6gvbE",
  "EUTdX5FpQY25YHAuW75872kgjyh5soQSsyhFe66obhYC",
  "98zTN4fcNeBsqZgCp1HjwwRoFemgWZu9J356WFZUvqvE",
  "8bkmusFvytH9VFostfC99N9mxMcnPdYm8RDvCsiGyBsj",
  "9NW1KkuRwBmjoEZpPHwtumTogRkEySSvzV8YwhYsHjTs",
  "s4gUBQTuNebecFFmpm79zTrww4V2dRRGWqjwWXqM2nF",
  "4KAouUZxAq5BUXovtPJXMESdMzrr2gm9qSLSogvQLcBx",
  "5RmCu8wWGFYJMRKR47eWybjAo5SAkSVFsfNpPSJycCzw",
  "HfdwobdeT3zFhtLHJyUQSHJLESsFbbSJtWPTphaQiqnW",
  "CDhK9nDovrdnQpUW4wBduehhyKdQwn7FY18ZXoCXvJuu",
  "DeByyXUo7NqojaJsRsaVNWpVxwj6PvMSW6sKKVN3krf2",
  "3Tz9B952CakuMKQRjJYfbfjMdJt2xpVQoYFi58qwg9rK",
  "DdwdBPPPizAvYydrUBvy2dhMVwQz8CvtYS32aiPXm6bt",
  "Bw3rpHWXxB5jhTkCwHE8xp6L2JuBw3X3Fmr9LynkgpTj",
  "BAsCzikUsonomcXrpg99kbAPP6eufaM2j2ggmWSQJqik",
  "Fp3ySHBgnAxv3D97uae6oeVk2u4LgZtN3Y1Ap93ozaYn",
  "9m2CJPisJBFEVMLszpVo6vwoSKeUqKt1ekpJCt45YN7X",
  "FAXYGXPLXm7Bt3q1FniLQ1y1BMsigHJnVP2vHAB3Ujkd",
  "7nbxQLrHVaTV1SFGjf1HvacVzW5QH5Pf4QHQJze2aKuU",
  "4VUZBcsird4TS5imNwDNEcPouXoCXsfJB6afHjdNU2pT",
  "3vBy3hx2vq9m8hinj4rBAz6qTJDRAFt4MKuSrX46SSWw",
  "GnpantdfqfrYFQxFCcUR97GvZ7Jmscndqa9vU88VYnqX",
  "EFAWpCr76dFtQt8LbnRBXZGdwGUTaWfw7gMTpWCqrf1i",
  "79kCLK7yEUHKTAS7kZe7NSUaWRGybvCEjVDa9v9ksqgz",
  "A2dgVVyG6h1QBwdXmJm5Q3zZp2fWNmFF7hkZv44uNgrr",
  "9BqZB8qguQ6PDA55E1tWjFFUipui92PisZkr9jDtz64j",
  "GYjzFH5SD3UaAQNFPHqLLow9G8xWr3isDqpMG7GNdsKS",
  "8NpvD3SvAD7sPvRRnJBxiWsqCRsvErSepeCk1XL1AGp1",
  "H2PSH3FWG2T29NRuPogfYMkgQi2oWTt48D1RXv2fTw1B",
  "2MHeQQWrCvtS763giiBfu3UHFrUw8Tt74fyV8KFuW3Th",
  "FQN4QZVW89VV3kaV3yGRmeRWHKCvFnpDJh4ATDF4E36",
  "CA6CT7wj6DEapTebGjt6Ngk63kY6vWkL1Hqi4HEpsdTq",
  "A6ugrsd9Ji3cJNWnzXnJGUBeHP5yMbL2Qo1EsiyiJcHE",
  "51QKQfvbmJ5omc2XxZa4jjdGtakAK4QGKivwvj5HwP9i",
  "8usf3WxD2pBjE5zSF4Q1bmEzhrm6GkjasmwVtCQ6CBjY",
  "GfYiKzghQYwmRGQH9AARL9KvUXNSVxiy2RhhpmwUi6Y6",
  "GGNjH65My6yGPUaNxJimcipSMAELCDFDPKAHzBaKjBm9",
  "AXbRWb3BR5oywAdnbcNGX2tHZva4tcCcwpDgxLQVbk91",
  "HfKvygFLgoJ81VXuvnjcrM8d4Y486gaWUk7z9nosEnvn",
  "3jMWPJ37zTT8R2BYqL3pCa2PEVKAZHZusvsGMei4j6c6",
  "34b17NWyi69fgEzuE6EeFqD62iLn9rWgjyvGR8RWRXWh",
  "CfBY5TR71gYtj5ALbS8VEJvrfwX1nxav1VPdYybqHbJi",
  "t82GwwkJyr9LQENTvsojDRvCoukQg2VC4o39C1WdHTv",
  "HBAdeknQcVw9UtDe76rLq8sqahQQJ3EzccTQojXj4GHb",
  "D9vU8xsgs7UCeCmFEF4gE9XuVe2VwUd2yGzwrLbmih4D",
  "6XtLDzPaCZw6TZ2GTCo4xpUNQFTDkocHZZoeEnWUq7KS",
  "5LQj76ku7j7HWmuxLvs7NWupteHuQmHAZA28xWYhQDQt",
  "3xDywfiqiK9z6HbwhagYV5K1mVrh26mAcmaNAuRugMqz",
  "AG3YCg48TUanwhdRAeZ7sqAFVrJa3R5aug8YNUUBYMKM",
  "EHRX4NP8cgqZust18xwHYn6qU7pFo5L6RwnSwn8hSwKx",
  "FX6bR5r1CcTaR1A6SWA1oTcupvr9qxRv8aFBAx3Py2E9",
  "BPX1ePDRE6Cgbd2rUVQQgEzkWsYESzuE7RAVKoFbUy4u",
  "C82TvaiJaufabGnX1nqmL7KkD6PZ6zmnKDV7wEjvtTYU",
  "Dp5Vyr9E598k4CdveGA3Mn4nWu3agyw2Rgev2hqL1m8g",
  "DeEVLPTZ48jwQ8RruWKMnJKpNcP2hBWFJCvowMMjxDFz",
  "EpnSQCaXGBLgq7mcAEj99JvBkiopPfaRaXbAjG4PjgR6",
  "HfshrvRTZG7uyz5tnbGMsmCbAUor22gzZk6y46cEtDr8",
  "2qadtaB5n9GQTjp7j3eEXpwKhBHgMy2cqx4TTRXrTpkh",
  "AGBuSpYYc7rxZ1uogy4E6Fdn7arBVxxyR4taJqfo21AH",
  "12Sbm6bFj5zXZLTPimVmBHsunEwrT3HS1xQuT9PTgUez",
  "8r8P7Z2dd2dmUxhbZ98KYeMCqQqW3ejn4cR2EFZoZMpb",
  "DNj6M6Yb2wE1fSG89YDiXUDyG1zjfumc2fMWJ9XmSwvF",
  "7b11HT3ZM2XWgA6SLaL2XaQ3Dos2rQGsADbtqsktbWdE",
  "4buNmDYYUQhJjryPfVXuMbkzwMuYsiRYH3JEWHt7gKnk",
  "2LfzLTRtD2AkpDiNxEDfKqEoNos31Aev2EzPKHZ4TJHA",
  "83iALyYhgBWzq8JZEiD1iwHG4kKdexnteuYUq22AtQ1h",
  "GC3fhAKEfRGRWyio3uGv7mDiV7n4wuP9WU7TzxRdPBB4",
  "8Tmz1BAgxb1MrXZn1goNhV9PxjmYJNFHRmHssNV87MF9",
  "322DnrMLa8YonQUc8phvPfiwGFp1oPmW3tVrMzjvdf8e",
  "5yuzREZXPCBCaxRNKdYR7V2rM6pPUk824Yg661XD1AcH",
  "CSUXfapJd14up9mnvpTpYSDCX3191EejFaHTGmMXbbKS",
  "AT83ovmsfCoJtzz4hp9tDX5Fj8weHKcCSPfo2ExY1eqZ",
  "AJAjCVehPfvajBbEhtnVCgUuBsoXC9Go8Acz1qSgY4jv",
  "65vVy74D24gefiodZxh2vUY7ePsuve8P8ZFFB4QftQqY",
  "BMsdanHbqvHwdMZvzG4pBQThGeja3BehmrXUYdErjdW6",
  "8CbPSM3u4UAKU6m1WUi9bd59HiDCaAr7RJMZwVkLpzCE",
  "9zCJhGREpZzEJXUyqMtnukt745Qf23eUQGuWQE6dVUXS",
  "9MxtLVrx7tCygwqwG7cecJkui97ZnkzyaJQB3W4Pr58f",
  "7L1e2MWKpks4kVKDuGXbLHEwGFpw4Xmzp2cwPPKtt27G",
  "3zJqbQUBZUrsdfug23S4rt5m4qrJp6oD8WoT4H9fQpTC",
  "48A5rozwyTjUaauqAgsAXUtcBtFUSq6Y4EKyj6cKMJQz",
  "BKbiaKw1gCb9k2kNeZfuLMb2RdyjyZqLuE8BLBHRqcK9",
  "8uvGZ86vH9Huq1NxyLcQ4QFebKPVE5zFP8teoYK3Byke",
  "JDLRWxD7j99WrQRSrAZyb1ZMM4kcYLRLcYNLUjYHDqLQ",
  "3TYRBMxiCGdwRekh59BZy7BvxPYani78zAkELhmBquVk",
  "Fk1WsePLzeixTQuxkAc8nbFHfvLwKrcLZu6jZ4BDWwuF",
  "DB3nPHfRaqB6gFJZ8pooAredsqXAQh84uwDRxk1hLHoB",
  "7ieHVUGmtJcUAbfg5mchRjBkiTmufYJrdPq6bB3X8Fan",
  "Yq7SBzbV14kQwv8bK8g7JGpeSXuW5w7FQwxiz6T2QDc",
  "9ypTb46CBSbecnXaoF7C3yDHdGwvDgQazP26PmMJ4G1K",
  "4zKzYoEbUSUfC4FhkVBiWvTsDakXrT7oqLkV4dikHpj4",
  "GZtXW1AnvgwvGRQzUKNG8T415kq6QPHH2xp29iv96mv5",
  "D7StpfAttdi6A9u5iCD8dmT6ZbgxeRyYCEfXebn5z6pg",
  "8NNqK7FcNzUi1Dq3UafvkDzfFp712vKiLCNqJGRMf8Xa",
  "HaqAEixUKNTx8jGmjki1iXmz1kZaPhEfrYQASeTM7YUB",
  "H3jBnH2P1JVL4qUawZdk1eE2iijh6Rpf1d61W7cx8beP",
  "CMtAbwAwdHo2VfQADMQ7nJV9rD7ygjhMTQ7emwgWLtpu",
  "3o531ggbX8zhy7vqoH9CghT9N7ufKQHVpu5DuhZjmSnq",
  "43rAuv3seunZN3z79pJWEkAqGaU6B9bKQMd9v8rocJ6Z",
  "2r8xdGkfGWuMetcrnTSQiZijafpW2TNaFHvsMZXPj7gx",
  "A2YKChG3HFjeRC8MEjYSxpshBYQRA6gkGPuaodg6UrmN",
  "BcgBMS72MnijTqCzdDzLNrqre2tfQrfYKkYSTVjCX3DK",
  "HGaCLTGeFNTuttx6XG13BKbNWAAn4yJEbUpogLAn4S8P",
  "2Kr5RozrrqWi1tXqLc6N2MLFCm5pNUko6vRr8j1EofVq",
  "9stctNMGwN22TZmdWuWhzZ4kvQgbgy27nCcV2xX3sB4X",
  "5T1p7Ugx9csZN54gTBx7LrU1kuJF1T35xVJE7RVWxcbc",
  "BCXCeLN5524iiBhTVFHThhHMLcawoJK3mby55kRRVVA3",
  "FA9dTpVvNqvfKNhSGuTrR2x8ZGeLixqschKUfjxeNVmr",
  "3b2LT1boH46CEcB4RgyVTv6gGy1gGVeEvx9V59hHHHFW",
  "7tSqVJvKsBhBcewSKNMEeBt5FCdD4Z2fpnVrKDYY7Db",
  "2a9YhomcXNzmTZxui6YJr16fTuHRxSK8qnC9BpBeQNtw",
  "9QAYGds5kXxzfGURsmoBCrAu88bG2gJU47J9V2MYxsFp",
  "7gQzGp4AgFQdVmqGzPuRjLLm8ME7qYhCu7tG3FjyTa6s",
  "7YBtPRgkWqpX2kdWTpiyXUu1zaBb7vdVA9gHPfV1sY6",
  "3gD1N8GP2q522p7gno6qE66FjTTPrqxTtSvWGuWET677",
  "uivp3oCMC1Ursa5px9qmCAG5cXeEcb4rFZh6yUW4D7k",
  "vPA3juRS7TieYSAWgUuVgA2WpWa4MdcQi95BjyHdpHg",
  "QZZZGqpRwf4DuKNiB99MhCfryWf9qVheRWdxBgcRKRa",
  "GHKupu7EqYLg9Ng2aWEj17RAb4Gm69HsdRxrMxTt3cVV",
  "8emb3oEhG3ieeT9BbS2i6pnHrUjK91oA5a1RTWuVg5o4",
  "DGAvmLeVif2PeNv3r2DU2HvYiNr8vPCXhX8FTZNcaTjb",
  "5PPPcvtJGY3e2rYWXsQo529ihUi2ECwte6dMX21Yip9z",
  "5pwt13gQqseFNVYghgou7MXVmFKBsoQV5wryPi4QVN38",
  "AGry7EEPZ31DfewZ81Dbv72UbCjZzrc1d3cLFQLDJFnc",
  "8MdgaxzEuJ6V1kfnzBpZP6AgddzH7CoiNRwAR6spV9mz",
  "7NTbihoV55KCzT1yYF5WzaMjykT3VeypJAiFL4BQUAwH",
  "DoYG7mc9B4FVWz5ZYy5KmFRTS3VrBPsqdaga9A3MjysB",
  "BrsSXnjBiNE7KACU98KzQ47k6HATNnRpW5P3L1uWwkAX",
  "AWbs6oGkoz31UyYeroY1LCvPvzGpyG7HAUpf7uPy8oY3",
];

const latestBlock = 301258200;

const fetchTransactionDetails = async (address, index) => {
  const connection = new Connection(
    ""
  );
  const publicKey = new PublicKey(address);

  const recentTransactions = await connection.getSignaturesForAddress(
    publicKey,
    { limit: 1 }
  );
  const signatures = recentTransactions?.map((tx) => {
    return tx.signature;
  });
  const detailTransaction = await connection.getParsedTransactions(signatures, {
    maxSupportedTransactionVersion: 0,
  });

  if (detailTransaction[0]) {
    if (detailTransaction[0].slot > latestBlock) {
      console.log(address, detailTransaction[0].slot);
    }
  }

  console.log(`Completed process for address ${index}`);
};

const run = async (addresses) => {
  for (let i = 0; i < addresses.length; i++) {
    console.log(`Processing address ${i}/${addresses.length}`);
    fetchTransactionDetails(addresses[i], i);
  }

  console.log("DONE");
};

run(addresses);

// const test = async (address) => {
//   const res = await fetch(`https://api-v2.solscan.io/v2/account/transfer?address=${address}&page=1&page_size=10&remove_spam=false&exclude_amount_zero=false&exclude_token=So11111111111111111111111111111111111111111`)
//   const data = (await res.json()).data;
//   console.log(data);
// };


// test("CMtAbwAwdHo2VfQADMQ7nJV9rD7ygjhMTQ7emwgWLtpu")
