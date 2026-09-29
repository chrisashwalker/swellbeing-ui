# Swellbeing UI

## Notes

- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- I have installed `prettier` for formatting. `eslint` is installed for linting. I have installed `jest` for testing.

- The repository is kept up-to-date using `Renovate`. Renovate PRs are configured to be raised in Draft, to make it easier to exclude them from automated workflow/pipeline runs, until they are deemed ready to review.

- There is a CI workflow to run lint and format checks, and run tests. The workflow must pass before a PR can be merged.

- There is a workflow to build and publish a Docker image when the main branch is updated. A two-stage build starts with a builder image, with build dependencies installed, but the final runtime image is leaner.

## Implemented screens

- `/` is the responsive welcome screen based on the supplied Swellbeing visual direction.
- `/join` creates a user through the REST API and presents the generated UUID once for safekeeping.
- `/login` treats that UUID as the user's single password.
- `/water` loads and saves dated water entries through the REST API.

The browser talks only to same-origin Next.js route handlers. The Flask API bearer token remains on
the server, while the user's UUID is kept in an HTTP-only, same-site cookie. Copy `.env.example` to
`.env.local` and set `SWELLBEING_API_TOKEN` to a token also present in the API project's
`ACCESS_TOKENS` setting. `SWELLBEING_API_URL` defaults to `http://127.0.0.1:8000`.

The API currently has no endpoint for deleting a water entry, so the interface supports retrieval
and creation only.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

The design uses local system fonts, so building the app does not depend on an external font service.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
