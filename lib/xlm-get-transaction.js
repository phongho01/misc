const axios = require("axios");
const fs = require("fs");

const BASE_URL = "https://horizon.stellar.org";
const OPERATION_TYPE_PAYMENT = "payment";
const OPERATION_TYPE_CREATE_ACCOUNT = "create_account";
const QUERY_LIMIT = 50;
const ASSET_TYPE = "native";

const getTransactionById = async (txid) => {
  const { data } = await axios.get(`${BASE_URL}/transactions/${txid}`);
  fs.writeFileSync("lib/tx.json", JSON.stringify(data));

  console.log(data.ledger);
};

// getTransactionById(
//   "b222f4f22d4301d28968a855831ebcc57e89f97486164ed49e912e480fe281c9"
// );

const getTransactions = async (transactions, url) => {
  const { data } = await axios.get(url);

  console.log(data._embedded.records.length);

  if (data._embedded.records.length) {
    const memoTransactions = data._embedded.records.filter((r) => r.memo);
    if (memoTransactions.length) {
      transactions.push(...memoTransactions);
    }
    let nextUrl = data._links.next.href;

    return getTransactions(transactions, nextUrl);
  }
  return;
};

const getXlmTransactions = async (txid, type) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/transactions/${txid}/operations?limit=${QUERY_LIMIT}&include_failed=false`
    );

    fs.writeFileSync(`lib/saved-data/${type}.json`, JSON.stringify(data));

    const operations = await data._embedded.records.filter((o) => {
      console.log("type", o.type, o.asset_type);
      return (
        o.type === OPERATION_TYPE_CREATE_ACCOUNT ||
        (o.type === OPERATION_TYPE_PAYMENT && o.asset_type === ASSET_TYPE)
      );
    });
    if (!operations.length) {
      return [];
    }

    const xlmTransactions = operations.map((o) => o.amount);
    console.log(xlmTransactions);
    return xlmTransactions;
  } catch (error) {
    console.error("HAVE ERROR", error.message);
  }
};

const SUPPORTED_TOKEN_HASH =
  "82cfb49554419834b19509869762d31a9d47c909f6d695bb7088e1e4e67bb71f";
const NATIVE_TOKEN_HASH =
  "b222f4f22d4301d28968a855831ebcc57e89f97486164ed49e912e480fe281c9";

getXlmTransactions(NATIVE_TOKEN_HASH, "native");
getXlmTransactions(SUPPORTED_TOKEN_HASH, "supported");
