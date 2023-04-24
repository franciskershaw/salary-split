# SalarySplit - Version 1

![amiresponsive](/screenshots/amiresponsive.png)

SalarySplit is a relatively simple application I have written to help me organise my bills and savings at the start of each month. I found that every time payday rolled around, I would always take ages working out how my paycheck needed to be divided up by writing quite messy notes on my computer. When factoring bills, the various different bank accounts money needed to be sent to, and the amount I would be aiming to save each month, the notes could become fairly complicated. This app solves that problem for me as I can update the amount of money coming in from a paycheck and produce a summary of how much money needs to be sent to each account based off of certain 'transactions'. These transactions are in turn are divided by 'Bills' and 'Savings', effectively representing funds that need to be moved around for one reason or another.

I've been using React.JS and Express.JS to produce full stack projects for work and personal projects for a few years now, but had never used Typescript. This project provided a great opportunity for me to attempt using Typescript on a production application while keeping the functionality fairly simple in order to make that learning process as smooth as possible.

The live site has been deployed to my Digital Ocean account, and the link to the site is [here](https://salarysplit.co.uk/).

## Contents

- [Planning and Design](#planning-and-design)
  - [Strategy](#strategy)
  - [Structure](#structure)
  - [Skeleton](#skeleton)
  - [Aesthetics](#aesthetics)
- [Data models](#data-models)
  - [Account model](#account-model)
  - [Transaction model](#transaction-model)
  - [User model](#user-model)
- [Known bugs](#known-bugs)
- [TBD Version 2](#tbd-version-2)
- [Technologies used](#technologies-used)

## Planning and Design

### Strategy

My goals were as follows:

- To create a project that allowed me to easily produce a summary detailing the amount of money that needed to be sent to certain accounts depending on a total of incoming funds from my salary and the bills and savings I needed to consider on a given month.
- To keep track of the amount of money in each of my accounts.
- To use Typescript on the frontend of the website so that I could continue my own development by learning a valuable coding skill.

### Structure

I decided to split the app into these pages:

- Auth: for registering an account or loging an existing user in
- Split: where 'transactions' are managed
- Summary: where the summary of how much money is sent to certain accounts is presented
- Accounts: where 'accounts' are managed and totals are calculated for these accounts

Additionally, I have a navigation bar present for logged in users that also displays the monthly salary so that this can be viewed and edited from all pages.

### Skeleton

My wireframes were drawn roughly on Invision:
![wireframes](/screenshots/salarysplitwireframes.png)

### Aesthetics

As this project was for a very specific purpose, and not necessarily optimised for wide use, the visuals for this version of the project have taken a slight back seat. I've used no flashy hover effects or animations, although I would very much like to improve these on version 2. Having said that, I did make the app responsive enough to be used properly on all device sizes.

- Background colour: #1A4861
- Font: Nunito

## Data models

The API of this project includes three Mongoose models: Account, Transaction, and User. Here is a summary of each model's structure and relationships.

### Account Model

The Account model represents a user's financial account. The schema for this model includes the following fields:

- name: The account name (required, String).
- user: The account's owner, which is a reference to the User model (required, ObjectId).
- amount: The account balance (required, Number).
- acceptsFunds: A flag that indicates if the account can directly accept new funds (required, Boolean, default: true).
- excludeFromTotal: A flag that indicates if the account should be excluded from the user's total balance calculations (required, Boolean, default: false).

### Transaction Model

The Transaction model represents a financial transaction. The schema for this model includes the following fields:

- name: The transaction name (required, String).
- user: The transaction's creator, which is a reference to the User model (required, ObjectId).
- amount: The transaction amount (required, Number).
- sendToAccount: The target account for the transaction, which is a reference to the Account model (required, ObjectId).
- type: The transaction type, which can be either "bill" or "savings" (required, String).

### User Model

The User model represents a user of the application. The schema for this model includes the following fields:

- username: The user's unique username (required, String, unique).
- name: The user's full name (required, String).
- password: The user's password (required, String).
- monthlySalary: The user's monthly salary (required, Number, default: 0).
- transactions: An array of the user's transactions, which are references to the Transaction model (Array of ObjectIds).
- accounts: An array of the user's accounts, which are references to the Account model (Array of ObjectIds).
- defaultAccount: The user's default account, which is a reference to the Account model (ObjectId).

The Account and Transaction models both reference the User model, allowing for a relationship between users, their accounts, and transactions.

## Known Bugs

At the time of writing, I am aware of several small issues that were not worth the time required to totally fix before deployment as I set myself a strict deadline of a month to develop the project.

### Performance issues with calculation of certain totals

I envisaged this project to be lightning fast when updating totals on all number inputs. The speed is acceptable, but not quite good enough for a site with wider use. This is because some of the totals require responses from the server before updating, while some inputs are using cached data in memory - meaning some totals calculate so much faster than others.

To fix this on version 2, I will require a change of approach whereby a client-side state manager is used to store all of the totals and updates when inputs are changed - possibly using useEffect to update the server when this client-side state is changed.

### Loading state flashes incorrect content

My loading state needs work for sure, I have a custom loading spinner but it is not being utilised properly as content flashes and is revealed in a messy manner.

### JOI validation error messages are not user friendly

If user input is incorrect, I send back the error response from the server which comes from JOI - currently this does not look presentable.

## TBD Version 2

- Clear known bugs
- Add inline validation on forms (will request the server onChange to check for conflicts)
- Add page transitions, hover effects, smooth animations for row addition or deletion
- Redesign accounts page to be slightly better looking
- Add a landing page and 'about' page
- Design and add a favicon
- (Possibly) make the site more useable for users who don't want to add an account

## Technologies used

- Node.JS, Express.JS
- MongoDB, Mongoose
- React.JS, Typescript
- React Query
- Tailwind
- Vite
- Digital Ocean
