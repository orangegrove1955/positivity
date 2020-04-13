// import faunadb from "faunadb";
const faunadb = require("faunadb");

/* configure faunaDB Client with secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = (event, context, callback) => {
  console.log("Function `random-saying` invoked");

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("sayingsByApprovedFlag"), true)),
        q.Lambda("sayings", q.Get(q.Var("sayings")))
      )
    )
    .then((response) => {
      console.log("Successfully got random saying", response.data);
      let items = response.data;

      let randomValue = Math.floor(Math.random() * items.length);
      let returnValue = items[randomValue];

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(returnValue.data.saying),
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
