// import faunadb from "faunadb";
const faunadb = require("faunadb");

/* configure faunaDB Client with secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = (event, context, callback) => {
  console.log("Function `random-saying` invoked");

  return (
    client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("sayingsByApprovedFlag"), false)),
          q.Lambda("sayings", q.Get(q.Var("sayings")))
        )
      )
      // q.Get(q.Ref(q.Collection("Saying"), "262464456652489226")))
      .then((response) => {
        console.log("Successfully got random saying", response.data);
        let stuff = response.data;

        return callback(null, {
          statusCode: 200,
          // body: JSON.stringify(response.data.saying),
          body: JSON.stringify({
            data: response.data,
            count: stuff.length,
          }),
        });
      })
      .catch((error) => {
        console.error(error);
        return callback(null, {
          statusCode: 400,
          body: "Something went wrong",
        });
      })
  );
};
