const axios = require("axios");

const validatorORBS = async (retryCount = 1) => {
  try {
    const SERVICES = [
      "Boyar",
      "Signer",
      "Logger",
      "EthereumWriter",
      "MaticWriter",
    ];

    const titleMessage = `\n Bot Tracking ORBS service\n`;
    let message = "";
    const { data } = await axios.get("ababa");
    const allServices =
      data.AllRegisteredNodes["ababa"]
        .NodeServices;
    SERVICES.filter((item) => allServices[item].Status === "Yellow").map(
      (item) => {
        message += `${item}: ${allServices[item].StatusToolTip}\n`;
      }
    );
    if (message === "") {
      message += "Status: OK";
    }
    throw new Error("ERROR: " + retryCount);
    return titleMessage + message;
  } catch (error) {
    console.log(error)
    if(retryCount < 5) return validatorORBS(retryCount + 1);
    return "DAILY ERROR Tracking ORBS service ";
  }
};


validatorORBS()
  .then(console.log);