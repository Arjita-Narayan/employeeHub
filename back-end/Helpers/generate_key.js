const crypto = require("crypto");

//key1 is for access token and key2 is for refresh token
const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");
console.table({ key1, key2 });
