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

  q.Match(q.Index("randomSaying"));

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(process.env.FAUNADB_SERVER_SECRET),
  });

  //   return client
  //     .query(q.Match(q.Index("randomSaying")))
  //     .then((response) => {
  //       console.log("Successfully got random saying", response);
  //       return callback(null, {
  //         statusCode: 200,
  //         body: JSON.stringify(response),
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       return callback(null, {
  //         statusCode: 400,
  //         body: "Something went wrong",
  //       });
  //     });
};
