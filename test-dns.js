const dns = require("dns");
dns.resolveSrv("_mongodb._tcp.cluster0.c61dwz4.mongodb.net", (err, records) => {
  console.log("err:", err);
  console.log("records:", records);
});