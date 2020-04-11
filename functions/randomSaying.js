import faunadb from "faunadb";

/* configure faunaDB Client with secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  console.log("Function `random-saying` invoked");

  return callback(null, {
    statusCode: 200,
    body: "Hello World from function",
  });
};
