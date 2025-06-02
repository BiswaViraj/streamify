# Streamify

## Get Started

### Install dependencies

To get started with Streamify, you need to install the necessary dependencies. Open your terminal and run the following command:

```bash
pnpm install
```

### Generate the Mock JSON data

To generate the mock JSON data, you can use the following command:

```bash
pnpm seed:db
```

### Start the JSON-Server

```bash
pnpm start:db
```

### Start the development React application

```bash
pnpm dev
```

### Tech Stack

- React
- TypeScript
- Tailwind CSS
- JSON Server
- React Router
- Shadcn UI
- Faker.js to generate mock data
- @tanstack/react-query for data fetching and caching
- @tanstack/table for table

### Testing

To run the tests, you can use the following command:

```bash
pnpm test
```

### Trade-offs

- The application uses JSON Server for mock data, which is suitable for development but not recommended for production.
- The application uses Faker.js to generate mock data, which is useful for testing but may not reflect real-world scenarios.
- Table pagination is implemented on the client side, which may not be efficient for large datasets. In a production scenario, server-side pagination would be more appropriate.

### Thought process

- The application is designed to be a simple and efficient way to manage and display data in a table format.
- The use of React and TypeScript allows for a type-safe and component-based architecture.
- Tailwind CSS provides a utility-first approach to styling, making it easy to create responsive and modern designs.
- The use of @tanstack/react-query and @tanstack/table allows for efficient data fetching, caching, and state management.
