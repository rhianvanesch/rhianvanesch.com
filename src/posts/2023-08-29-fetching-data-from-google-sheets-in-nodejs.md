---
title: Fetching data from Google Sheets in Node.js
description: How to automatically add fragment identifiers and anchor links to headings in Markdown, on an Eleventy site.
date: 2023-08-29
---

## Prerequisites

I'm using Node.js v20.5.1. Earlier versions may work. `node` and `npm` should be available on your command line.

## Set up Google and authentication

1. Follow the instructions for setting up a new project in the Google Developer Console.
2. Follow these instructions for creating a Service account.
3. Choose a Google Sheet and share it with your new service account (using the email)

Now, let's get started with code!

## Install dependencies 

In a new folder, run `npm init -y` to generate a `package.json` file, to manage your dependencies.

Install `dotenv`, `google-auth-library` and `google-spreadsheet`.

I'm using:

- `dotenv` at version `16.3.1`
- `google-auth-library` at version `8.9.0`
- `google-spreadsheet` at version `4.0.2`

(If you have different versions, the APIs may have changed, and the instructions here might not be accurate.)

## Create a `.env` file

We need a safe way to pass Google project's service account credentials into the code. We don't want to expose this sensitive data to the outside world.

We can use a `.env` file to hold the data as environment variables. We'll then use a `.gitignore` file to prevent this file from being committed to our respository. Even if your repository is private, having clean security habits is a good idea. 

```js
import 'dotenv/config'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
 
const jwt = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes:  [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

const doc = new GoogleSpreadsheet('YOUR_ID_HERE', jwt)
await doc.loadInfo()

const sheet = doc.sheetsByIndex[0]
const rows = await sheet.getRows()
const data = rows.map(row => row.toObject())

console.log(data)
```