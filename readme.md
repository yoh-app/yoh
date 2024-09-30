# yoh.app

yoh.app is a website builder that allows users to create unique websites fast with templates, sell digital products (videos, audios, links), and allows users to request ad spaces for passive income.

# Folder Structure

This is a monorepo that consists of a frond end admin app, a backend graphql server, and a front end client app. The server code and admin front end exists in the admin folder and client front end exists in the client folder.

## Install

To install the dependencies, in / root, run

```bash
yarn
```

## Setup

### admin

change direction to ```/admin```, to create db:

```bash
yarn db-dev
```

and generate admin app essentials:

```bash
yarn generate
```

or you can do both via:

```bash
yarn setup
```

### client

change direction to ```/client```, to copy server from server:

```bash
yarn copy-server
```

to generate code:

```bash
yarn codegen
```

## Run

### admin

change direction to ```/admin```:

```bash
yarn dev
```


### client

change direction to ```/client```:

```bash
yarn dev
```

## Stripe Webhook

To receive testing webhooks. please follow stripe cli at [Stripe-cli](https://stripe.com/docs/stripe-cli)


stripe listen --forward-to http://www.awkns.local:3002/webhook