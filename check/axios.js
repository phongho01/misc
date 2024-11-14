const axios = require('axios');

const run = async () => {
    const res = await axios.get('https://ipinfo.io/', {
        headers: {
            Accept: 'application/json',
        }
    });
    const data = res.data;
    console.log(data)
    console.log('g1');
}

run();