## Simple Task Management Web Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It is a simple task management web application with additional features to track task due dates and persist tasks using local storage.

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm, yarn, pnpm, or bun (any package manager of your choice)

### Installation

1. Clone the repository:

```bash
 git clone <repository-url>
```

2. Navigate to the project directory:

```bash
 cd <project-directory>
```

3. Install dependencies:

```bash
 npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
 npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## Assumptions Made

- The task management application is a single-user application.
- Tasks are stored locally in the browser's local storage to ensure data persistence between page reloads.
- Zustand is used for state management, providing a lightweight and efficient way to handle global state.

## Additional Features and Enhancements

- **Task Due Date Tracking:** Each task can have a due date associated with it, making it easier to manage and prioritize tasks.
- **Local Storage Integration:** Tasks persist even after refreshing the page by utilizing local storage for storage management.
- **Zustand for State Management:** Zustand is used to handle global state, making the application state management more efficient and structured.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
