// import faunadb from "faunadb";
const faunadb = require("faunadb");

/* configure faunaDB Client with secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  console.log("Function `random-saying` invoked");

  return client
    .query(q.Get(q.Ref(q.Collection("Saying"), "262464456652489226")))
    .then((response) => {
      console.log("Successfully got random saying", response.data);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data.saying),
      });
    })
    .catch((error) => {
      console.error(error);
      return callback(null, {
        statusCode: 400,
        body: "Something went wrong",
      });
    });
};
