const del = require("del");

module.exports = async function clean(done) {
  await del(["build", "dist"]);
  
  done();
}