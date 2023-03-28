const HttpProxyAgent = require('https-proxy-agent');
const axios = require('axios');

exports.proxyTest = async (req, res) => {
    const proxyList = req.body.proxies;
    const testUrl = 'https://www.nike.com/ca/launch';
    const results = [];

    for (const proxy of proxyList) {
        const { address, port, username, password } = proxy;
        const proxyUrl = `http://${username}:${password}@${address}:${port}`;
        const agent = new HttpProxyAgent(proxyUrl);

        try {
            const startTime = Date.now();
            const response = await axios.get(testUrl, { proxy: false, httpsAgent: agent });
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            if (response.status === 200) {
                const jsonResponse = response.data;
                console.log(`Proxy ${proxyUrl} is working, IP: ${jsonResponse.origin}, response time: ${responseTime} ms`);
                results.push({ proxy, status: 'working', ip: jsonResponse.origin, responseTime });
            } else {
                console.log(`Proxy ${proxyUrl} is not working, status: ${response.status}`);
                results.push({ proxy, status: 'not working', responseTime });
            }
        } catch (error) {
            console.error(`Error testing proxy ${proxyUrl}:`, error);
            results.push({ proxy, status: 'error', error });
        }
    }

    res.json({ results });
};
