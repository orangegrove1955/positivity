# Positivity.today

## What it is

Positivity.today is a place for people to share messages of positivity with strangers. Simply [visit the website](https://positivity.today) to see a message someone has already left, then leave your own!

## How it works

The entire site is built using the JAMstack, with the frontend hosted on the Netlify, database running on FaunaDB, and a custom API implemented through Netlify functions. When leaving a new quote, the message is added to the database with a flag to not be chosen, until it has been approved for use, to prevent spam items from showing up in the quote lookup.

### Quote lookup

When you visit the site, a request is placed to the Netlify function from the frontend, which passes a request for a random quote to FaunaDB. A quote is chosen at random from the database of approved quotes, which is then passed back to the function, and sent through to the frontend.

### Quote adding

When adding a message, a request from the frontend, containing the quote to be added, is sent to the Netlify function, which in turn attempts to add the quote to FaunaDB, with a flag of not approved. This saying can then be manually checked before adding it to the list of quotes approved for viewing, in order to weed out negative or offensive quotes.

# See it in action

The site is hosted at [positivity.today](https://positivity.today), you should check it out now!
