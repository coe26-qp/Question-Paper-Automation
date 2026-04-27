const bcrypt = require("bcryptjs");

(async () => {
  const hashed = await bcrypt.hash("exam123", 10);
  console.log(hashed);
})();
