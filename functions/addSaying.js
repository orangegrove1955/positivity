// import faunadb from "faunadb";
const faunadb = require("faunadb");

/* configure faunaDB Client with secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = (event, context, callback) => {
  console.log("Function `add-saying` invoked");
  const saying = {
    data: { saying: event.body, approved: false },
  };
  console.log(saying);

  return client
    .query(q.Create(q.Collection("Saying"), saying))
    .then((response) => {
      callback(null, {
        statusCode: 200,
        body: "Successfully added your message",
      });
    })
    .catch((error) => {
      console.error(error);
      callback(null, {
        statusCode: 400,
        body: "Something went wrong",
      });
    });
};
