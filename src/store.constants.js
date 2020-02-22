export default new Proxy({}, {
    get: (target, prop) => {
        return prop;
    }
});