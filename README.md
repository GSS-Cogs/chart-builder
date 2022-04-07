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



## Automated build

A CI/CD pipeline is configured using Google Cloud Build and deploys the containerised app to this URL:

https://chart-builder-no4vxskx7a-nw.a.run.app/



#### Build trigger

Automated build is triggered by changes to the main branch of the `chart-builder` source code



#### The automated build configuration is managed in two places:

1. **Dockerfile and nginx.conf files in the chart-builder repo**

   These files are both located in the root of the `chart-builder` repository.

   The `Dockerfile` specifies a multistage docker image build. The first stage builds the source code and the second stage copies this build output (without the source code and node modules) into a new container image. The resultant image (approx. 45Mb) is then deployed.

   The `nginx.conf` file is used to configure the nginx web server that runs inside the container.



2. **In the GCP Cloud Run web console **

   The GCP console can be used to configure the build trigger and container specification

   1. Browse to the `GSSCOGS/idpd-platform project`
   2. Open the `chart-builder` service
   3. Go to **Edit and Deploy New Revision**
   4. Adjust the configurations for: *Container Port, CPU allocation, Capacity (memory and CPU), Request timeout, Max requests per container and Auto-Scaling*
   5. To adjust the build trigger follow the link under the General section to **Cloud Build trigger**
   6. Click **Deploy** to finalise the changes 





## Library Build

The chart builder can be built as a reusable NPM package.  Start by choosing a version number, then run:

```shell
# set version
export VERSION=<next version> 
# use webpack.library.config.js to build the dist/ dir
yarn library
# publish it to NPM
cd dist
yarn publish
# tag it and push the tag to origin
git tag $VERSION
git push --tags 
``` 

