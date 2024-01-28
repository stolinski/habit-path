# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Add a `.env` file, and include the contents found in the `example.env` file.

You will want to create a [Neon](https://neon.tech/) database, and add the database URL to the `.env` file.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

To run migrations, run the `migrate` script:

```bash
pnpm run migrate
````

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

To create a user account for yourself, go to `/signup` and create an account.
The first user account to be created will be considered an admin account. Subsequent accounts will be considered regular users.
For the "code" input, provide the `PIN` you defined in your `.env` file.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
