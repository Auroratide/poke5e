# Pokemon 5e Reference

**Visit at [auroratide.github.io/poke5e](https://auroratide.github.io/poke5e/)!**

This is a reference for a ton of Pokemon-related content that you can use in your Dungeons and Dragons games. It also lets you manage trainers and pokemon teams.

## Found a problem?

Tell me about it by leaving a [Github issue](https://github.com/Auroratide/poke5e/issues)!

## Developer stuff

For anyone who wants to dive into the code and stuff. Note: I'm assuming a lot of familiarity with git, javascript development, npm, and such and such.

This site is a static [SvelteKit](https://kit.svelte.dev/) site that makes use of [Supabase](https://supabase.com/) for data storage.

### Set up your environment

Assuming you have the code downloaded locally, you will need to set up a `.env` file; use the `.env.example` file as a template.

You're not going to have access to the real Supabase credentials, and I haven't set up a local supabase docker image yet. For now, you can either set up your own supabase environment, or set the `PUBLIC_OFFLINE` environment variable to true; this sets up a sorta in-memory representation of the database.

### Running the code

```
# Install dependencies
pnpm install

# Run the project
pnpm dev

# Run the tests (assuming the site is running)
pnpm test
```

## Disclaimer

This is unofficial Fan Content and is not approved/endorsed by © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc. Portions of the material may be property of © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc.

This site may make use of copyrighted material the use of which has not always been specifically authorized by the copyright owner.

This constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the US Copyright Law. In accordance with Title 17 U.S.C. Section 107, the material on this site is offered publicly and without profit, to the public users of the internet for comment and nonprofit educational and informational purposes.

Copyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for "fair use" purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted. No copyright(s) is/are claimed.

The site owner gains no profit from posted content, so it falls under "Fair Use" guidelines.
