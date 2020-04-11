// import faunadb from "faunadb";
const faunadb = require("faunadb");

/* configure faunaDB Client with secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = (event, context, callback) => {
  console.log("Function `add-saying` invoked");

  return callback(null, {
    statusCode: 200,
    body: "Hello from addSaying",
  });
};
