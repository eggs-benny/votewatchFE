# Votewatch

## Introduction

Keep track of what your representative is doing in the House of Commons and let them know what you think about how they do it.

[Votewatch](https://main.dd2wf6zge1w12.amplifyapp.com/home) is a TypeScript React web application that enables users to search for their local MP or any MP by name, view detailed information about their recent voting activities, and get in touch with them to give feedback. The webapp provides insights into MPs' decisions in parliament, facilitating a better political transparency and understanding of their political stances and actions.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Roadmap](#roadmap)
- [Known Issues](#known-issues)
- [License](#license)

## Features

- **Search for MPs by postcode**: Easily find your local MP with just a postcode.
- **Search MPs by name**: Look up MPs by entering their names.
- **MP details and voting history**: Access detailed profiles of MPs including recent votes.
- **Email MPs directly**: Contact MPs directly with pre-populated text that users can amend.
- **Access to additional information**: Follow links to additional information and sources.

## Installation 

To set up Votewatch locally, follow these steps:

1. Clone the repository from its source: [here](https://github.com/eggs-benny/votewatchFE).

2. Create a hidden .env file in the project root directory and add the following key:

    ```json
    REACT_APP_TWFY_KEY=[add-theyworkforyou-API-key-here]
    ```
The API key can be requested from [They Work For You API](https://www.theyworkforyou.com/api/).
N.B. Please keep this hidden so as not to expose your key publically.

3. Navigate to the project directory and install the dependencies:

    ```bash
    npm i
    ```

## Usage

To run Votewatch on your local machine, execute the following command in the project directory:

    ```bash
    npm start
    ```
This will start the local server on localhost:3000.

Alternatively the webapp is deployed via AWS Amplify [here](https://main.dd2wf6zge1w12.amplifyapp.com/home)

## Dependencies

Votewatch is built using several key technologies and libraries:

- react (inc Create React App dependencies)
- redux
- prettier
- typeScript
- yup
- mui
- slick-carousel
- chart.js
- nprogress

## Roadmap
### Improvements
- Increase test coverage
- Mobile Optimisation and/or build mobile app w/ React Native
- Show if MP was a teller in a commons vote
- Show if MP abstained

### Features
- Add a backend to allow users to register & login, then save their local MPs
- Notify users when a new vote has taken place in the commons (email or notification)
- Allow users to approve/disapprove of MP's votes, and track these approvals
- Email directly from the browser, not mailto:
- Add MP's abstinence record for recent votes to their page.

## Known Issues
- Manually typing a member ID currently just reloads the page: http://localhost:3000/member/[memberId]
- Styling on error handling to be fixed

## Licenses
Contains Parliamentary information licensed under the [Open Parliament Licence v3.0](#https://www.parliament.uk/site-information/copyright/).
Data service provided by [TheyWorkForYou](#https://www.theyworkforyou.com/)
