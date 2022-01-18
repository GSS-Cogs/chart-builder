# Chart Builder

Chart Builder is a proof-of-concept app to understand the feasibility of using a CSV file (or SPARQL query) to generate and customise a chart or data visualisation.

## Development

Chart Builder is an HTML-JavaScript app built with the React-TypeScript stack.

Ensure you have [Node](https://nodejs.org/en/download/) installed on your system. Chart Builder has been built against Node v16.13

Ensure you have yarn installed

    npm install --global yarn

We use yarn to manage packages. To install the project packages

    yarn

Then, to launch a local development instance of Chart Builder, run:

    yarn start

## Build

To build the app locally:

    yarn build

The output directory is build. You can copy the build assets from there to the wwwroot of your webserver
