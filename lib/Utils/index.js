module.exports = {
  nowInMillis() {
    return Date.now();
  },
  now() {
    return nowInMillis();
  },
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  reflect(promise) {
    return promise
      .then((data) => {
        return { data, status: "resolved" };
      })
      .catch((error) => {
        return { error, status: "rejected" };
      });
  },
  async PromiseAll(values) {
    let results;
    await (async () => {
      return await Promise.all(values.map(this.reflect));
    })().then(async (res) => {
      const errors = [];
      results = res.map((r) => {
        if (r.status === "rejected") {
          errors.push(r.error);
        }
        return r.data;
      });
      if (errors.length !== 0) {
        // have lots of error, throw first error
        throw errors[0];
      }
    });
    return results;
  },
};
