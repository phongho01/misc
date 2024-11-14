let isRequesting = false;

const getBlockCount = async (retryCount = 0) => {
  try {
    console.log("getBlockCount", retryCount);

    if (isRequesting) {
      return getBlockCount(retryCount);
    }

    isRequesting = true;
    if (retryCount < 10) {
      throw new Error("Error");
    }

    isRequesting = false;
    return 1;
    
  } catch (error) {
    isRequesting = false;
    if(retryCount < 10) return getBlockCount(retryCount + 1);
    throw error;
  }
};


const run = async () => {
    await getBlockCount();
}

run();