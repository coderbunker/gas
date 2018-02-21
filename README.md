# Coderbunker GSuite App Scripts

## Introduction

Source of truth for Coderbunker is stored on Google G-Suite Apps.

We use these scripts to Extract, Transform, Load the data.

## Usage

Use class to pull, push and deploy:

https://developers.google.com/apps-script/guides/clasp

## Layout

One subfolder per ScriptId (set of source files).

Each ScriptId can both act as an add-on and as a GET / POST endpoint

## Installation

Need the following File > Project Properties > User Properties set:

* orgName: Coderbunker
* naturalLanguageApiKey: (API key from Developers Console)
* OAUTH_CLIENT_SECRET: (Client Secret from OAuth Developers console)
* OAUTH_CLIENT_ID: (Client ID from OAuth Developers console)
* targetFolderName: Coderbunker Freelancers Profiles

## More information

See:

* [Google Developers Docs](https://developers.google.com/apps-script/)
* [Coderbunker Systems presentation]( https://docs.google.com/presentation/d/1ldRkSu5u0jK5LqAaN8OMU6G81a24TUJBOtVZp-B5C9k/edit#slide=id.g336ffe7dfd_0_4)
