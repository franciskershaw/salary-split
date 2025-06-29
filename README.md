# SalarySplit - Version 2

SalarySplit is a personal side project that helps me work out what to do with my money each month. I had found that I was constantly doing lots of maths every time I got paid, working out how much money needed to be sent to each bank and savings account depending on which bills were coming out and how much I was planning on saving. Most of the time, I'd forget some big expense I should've factored in which would ruin my plans to save each month, so it became clear I could benefit from some way of tracking all of this information, and the idea for this application was born! The site provides the functionality to manually track bank accounts, and linking these accounts to bills, expenses, and monthly savings goals in order to summarise in great detail how your salary should be split (hence the name!) between your various accounts each time you get paid.

This repository is the frontend layer of the full stack application, written in React/Typescript and deployed to Vercel. The API layer is stored in [this repository](https://github.com/franciskershaw/salary-split-api), which serves data stored in a Mongo database hosted in Atlas through an ExpressJS REST API, also written in Typescript. The live website can be accessed [here](https://www.salarysplit.co.uk/) for free, with user account creation available through an email address and password or a google account.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features Explained](#key-features-explained)
- [Authentication](#authentication)
- [Data Management](#data-management)
- [Deployment](#deployment)

## Features

- **Payday Breakdown**: Visual presentation of monthly salary allocation across different accounts with a breakdown of what bills/savings/expenses are contributing to that total number
- **Account Management**: Track multiple bank accounts (Current, Joint, Savings, Investment) and optionally store their amounts manually to help with an overview of your total account balances categorised by current account, savings account, joint account, or investment
- **Bill Tracking**: Manage recurring monthly payments with categorisation, differentiated in style and presentation
- **Expense Management**: Track one-time or short-term expenses that may factor into your financial goals for a given month
- **Savings Goals**: Set and monitor monthly savings targets and which account that amount needs sending to
- **Cost Splitting**: Split bills and expenses between multiple people, which factors into the total amount you as an individual needs to send to certain accounts
- **Real-time Calculations**: Automatic allocation summaries and balance tracking
- **Responsive Design**: Works seamlessly on desktop and mobile devices so you can track your data on the go
- **Dark/Light Theme**: Customisable theme preferences
- **Multi-currency Support**: GBP, USD, EUR support

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, ShadCN components
- **State Management**: TanStack Query (React Query) and React Context
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React, React Icons
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Theme**: Next-themes
- **Notifications**: Sonner

## Project Structure

The application follows a feature-based architecture with clear separation of concerns:

- **Components**: Reusable UI components and layout elements
- **Pages**: Main application views (Dashboard, Accounts, Bills, etc.) and their page-specific components and hooks
- **Types**: TypeScript type definitions
- **Hooks**: Global custom React hooks for data fetching and state management, for use across several parts of the site
- **Constants**: Application constants and configuration
- **Lib**: Utility functions and helpers

## Key Features Explained

### Dashboard

The dashboard, which is where you'll be directed when you're logged in, is where all of the most important summarised information lives. As such, it's only really useful once you've added your relevant bank accounts, monthly bills, and your take home salary or expected incoming funds for the next month. Once this data is stored, the dashboard can show a full breakdown of how your month is looking once you get paid:

#### **Payday summary**

- Breaks down how much of your salary has been allocated to bills, expenses, savings
- Displays how much is left over as spending money.
- Colour coding kicks in if you've overallocated your salary to indicate that you're over extending on a given month.

#### **Allocation cards**

Each account that has been linked to at least one bill, expense, or savings, will be rendered as a large allocation card that summarises the total amount that needs to be sent to that account and a breakdown of exactly what has factored into that amount. On mobile the card becomes a drawer that shows and hides the breakdown upon user interaction.

#### **Account balances summary**

Using the account categories that I've included in the project (current, savings, joint, investment) - the dashboard summarises the total the user has stored against the categories so you can see an at a glance total for each.

### Accounts page

This page is where you can add and manage bank accounts. Optionally store the amount that is on the account. This is a manual process and doesn't factor into the core salary splitting functionality, but it's useful in terms of tracking totals across the categories I've inculded in the project (current, savings, joint, investment).

There must always be one 'default' account, which will automatically be attributed to the first account you create, although you can change this later on to another account if you like. This default account is where any leftover balance on your takehome salary is automatically allocated to as spending money on the summary page. Each account has a toggle for whether it can directly receive funds, which essentially means it can be transferred to directly via the account that has your salary in it - as opposed to through another account. This mostly for when you have savings accounts that don't have bank details you can send to through online banking.

A target amount can be attributed to an account, which essentially allows that account to always reach a specified value on a given month in the allocation summary regardless of what bills and savings are being added in. This is especially useful if you don't want to pay in the exact total based on bills, but rather add in a buffer that goes above the amount required by bills. My personal use case is with my partner on our joint account, so that the amount I'm being told to pay in matches the rounded amount we've agreed to go over the total of our bills

The user can reorder the accounts in order of their own preference and filter the totals based on categories - which will persist in the database.

### Bills, Expenses, Savings pages

These three pages all follow almost exactly the same pattern an structure as each other, which in turn is not too disimilar to the style laid out in the accounts page. The user stores a bill, expense, or saving, and links it to a bank account so that the summary will correctly factor it into the breakdown. These three features also allow the individual items in question to be split between more than 1 person so that the user is only paying their portion of a bill each month. As with accounts, the user can reorder all of these by their preference and filter the totals based on categories.

## Authentication

- Google OAuth integration
- Local authentication with email/password - no confirmation of email is required
- JWT token-based session management and protected routes for authenticated users

## Data and statte management

- RESTful API integration
- Optimistic updates for better UX
- Real-time data synchronisation
- Filtering and sorting capabilities
- Bulk operations support

## Deployment

- Vercel deployment configuration included
- Environment variable management
- Build optimisation
- Performance monitoring
