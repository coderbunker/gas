# Export functions

## Overview

Transformation operations on the Coderbunker Profiles slide.

Potentially applicable to any Google Slides.

## Configuration of profiles (Google Slides)

Need the following File > Project Properties > User Properties set:

* ```ORG_NAME```: Coderbunker
* ```NATURAL_LANGUAGE_API_KEY```: (API key from Developers Console)
* ```OAUTH_CLIENT_SECRET```: (Client Secret from OAuth Developers console)
* ```OAUTH_CLIENT_ID```: (Client ID from OAuth Developers console)
* ```TARGET_FOLDER_NAME```: Coderbunker Freelancers Profiles

## Source

Freelancers profiles:

https://docs.google.com/presentation/d/1LvvSUc4VEU9hSSgi1x8PJWA_lBZ5ne7Few76U6CCFXI/edit?zx=18dqh8qz4s4p#slide=id.g1d6a07363c_6_0

## Functionalities provided

* Authorize: authorize access of the script to the documents as the user
* Logout: de-authorize
* Convert slides: turn slides into thumbnails 
* Show thumbnails: show sidebar with thumbnails
* Snapshot: capture and upload to cloud database
* Convert to spreadsheet: convert footer key/value pairs into a Google Spreadsheet

Additionally, API endpoints are available to open the raw JSON.

## Where to start

### frontend

Functionality is added to the menu through ui.js onOpen function.

From there, callbacks to handle user selection are added.

### REST API

see rest-api.js