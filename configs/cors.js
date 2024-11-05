const allowlist = [process.env.ANGULAR_APP_URL];

console.log("Allowlist:", allowlist);

const getCorsOptions = (req, callback) => {
  const origin = req.header("Origin");
  const corsOptions = allowlist.includes(origin)
    ? { origin: true }
    : { origin: false };
  callback(null, corsOptions);
};

module.exports = getCorsOptions;
