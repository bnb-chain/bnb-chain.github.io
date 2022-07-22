# BNB Chain Documentation 

## Overview

This is the updated documentation for BNB Chain for a better user experience and navigation. This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator. Navigation bar are updated providing a better division of topics and easier navigation for the users. Multiple files have been re-formatted and new files are also included.

### Prerequisites

  - **Node** _version >= 14 or above_
    - _node -v_
      - v16.13.0
     
  - **npm** _--version_
    - 8.1.0
  
  - **Yarn** _version >= 1.5 _
    - _yarn --version_
      - 1.22.17
    
### Installation

The easiest way to install Docusaurus is to use the command line tool that helps you scaffold a skeleton Docusaurus website. You can run this command anywhere in a new empty repository or within an existing repository, it will create a new directory containing the scaffolded files.

```
npx create-docusaurus@latest [name] [template]
```

### How to Run Locally

Clone the reository and run the following commands.

### Local Development

Install the packages.

Using `npm`

```
npm install
```

Using Yarn

```
$ yarn install
```

Start local development server

Using `npm`

```
npm run start 
```

Using Yarn

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build
We recommend to use the yarn package for building and deploying this website.

Using `npm`

```
npm run build 
```

Using Yarn

```
$ yarn run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Serve Locally after build is created

Using `npm`

```
npm run serve
```

Using Yarn

```
$ yarn run serve
```

The website is run locally on your deault browser on http://localhost:3000.


## Additional Notes

#### Generating JavaScript SDK Markdown

In a **javascript-sdk** directory cloned in this repo's parent directory, use the `yarn build:docs` command to generate the file, then copy the generated file in `docs/jsdoc.md` over the existing `docs/api-reference/js-sdk/jsdoc.md`:

```bash
$ cp ./docs/jsdoc.md ../docs-site/docs/api-reference/js-sdk/jsdoc.md
```

#### Generate swagger doc

```bash
$  swagger-codegen generate -i ./rpc-openapi.json  -l  html2   -o ./site/rpc-swagger
$  swagger-codegen generate -i ./swagger.json  -l  html2   -o ./site/api-swagger
```

