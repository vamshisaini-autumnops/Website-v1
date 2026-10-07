# Autumn Ops website

The approved Autumn Ops Home and About website. Built with React and TypeScript, with Vite for development and esbuild for production. Pages are prerendered and hydrated for navigation and the Capture / Connect / Update illustrations.

## Local development

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run check
npm run build
```

The deployable output is `dist/`. Routes are `/` and `/about/`; unknown routes display the custom 404 page. The original approved logo is in `public/autumn-ops-logo.png`.

## Cloudflare deployment from GitHub

1. Open your GitHub repository `vamshisaini-autumnops/Website-v1` and commit these source files to `main`. Upload the extracted contents at the repository root, preserving `public/`, `scripts/`, and `src/`. Do not upload the ZIP itself or wrap everything in another folder.
2. In Cloudflare, open Workers & Pages, create a Worker, and choose Import a repository.
3. Authorize Cloudflare for this repository only, and select it.
4. Set the Worker name to `autumn-ops-website` (must match `wrangler.jsonc`).
5. Set the production branch to `main` and the root directory to the repository root.
6. Set the build command to `npm run check && npm run build`.
7. Set the deploy command to `npx wrangler@4 deploy`.
8. Deploy, verify Home, About, and an unknown URL, then use the assigned public workers.dev address or add your domain in Settings > Domains & Routes.

Cloudflare installs packages using the committed package-lock.json. If the setup offers an install command, use `npm ci`. Choose Node.js 22 where configurable. Every push to the configured branch triggers a build and deployment.

Do not select a paid upgrade for this static website. Do not put account passwords or API tokens in the code or repository. The static site needs no application environment secrets, database, backend, or invoice-processing service.

## Product status

The invoice workspace is illustrative. There are no real uploads, user accounts, or POS integrations. The site highlights the current Infant phase and the planned Baby, Toddler, Teenage, and Adulthood phases. No unverified contact details are published.
