# Epiverse search frontend

This repository hosts the frontend work, which automatically deploys using github pages. It hosts both the search, and the map functionality in one place. The `epiverse-search` and `epiverse-map` repo's are where the discussions around the entire project take place. This repository is only about the front-end.

## Commands

We use React for the microsite. After cloning this repository, these are the primary commands you will need to run

```sh
npm install
npm start # dev server
```

If you want to do things for production:

```sh
npm test # run unit tests
npm run build # build the production version
```

### Docker deployment

We offer a Docker container image that stays up to date with the code in this repository. This makes it easier to deploy the page and keep it up to date. Specifically, you can run the Docker container using the following command:

```sh
docker run -p 3000:80 ghcr.io/epiverse-connect/epiverse-search-frontend:latest
```

## Related

The search is further detailed in the following repo's:

- [`epiverse-search`](https://github.com/epiverse-connect/epiverse-search): Specifications, designs
- [`epiverse-search-backend`](https://github.com/epiverse-connect/epiverse-search-backend): Backend deployment implementation
