# 👻&nbsp;&nbsp;Headless Ghost with Next.js on Fission

- [👻&nbsp;&nbsp;Headless Ghost with Next.js on Fission](#headless-ghost-with-nextjs-on-fission)
  - [✨&nbsp;&nbsp;Getting Started](#getting-started)
    - [👻&nbsp;&nbsp;Setting Up Ghost](#setting-up-ghost)
      - [Public or Local Ghost?](#public-or-local-ghost)
      - [Setting Up Local Ghost](#setting-up-local-ghost)
      - [Exposing the Ghost Content API](#exposing-the-ghost-content-api)
    - [💻&nbsp;&nbsp;Running Next.js Locally](#running-nextjs-locally)
    - [🌐&nbsp;&nbsp;Deploying to Fission](#deploying-to-fission)
      - [🔰&nbsp;&nbsp;Fission CLI Install and Sign Up](#fission-cli-install-and-sign-up)
      - [🌱&nbsp;&nbsp;Register New Fission App](#register-new-fission-app)
      - [🚀 &nbsp;&nbsp;Aand... Launch!](#-aand-launch)
      - [🤖&nbsp;&nbsp;(Semi-)Automatic Deployment with the GitHub Action](#semi-automatic-deployment-with-the-github-action)
  - [🙏&nbsp;&nbsp;Show your support](#show-your-support)
  - [📝&nbsp;&nbsp;License](#license)

---

This starter is based on the official
[blog-starter-typescript](https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript)
from [Next.js](https://nextjs.org).

We changed it only enough to make it possible to fetch and publish blog posts
from the Ghost CMS, while keeping the ability to write Markdown files in the
git repo. It's a purely additive change.

There's also a GitHub Action to build and publish the static website to
Fission. It works automatically on pushes to the git repo, and can be triggered
manually after updating the content on Ghost. (The default Ghost webhook isn't
customizable to trigger a GitHub Action, but that can be added as a plugin.)

The Markdown blog posts are stored in `/_posts` as files with frontmatter
support. Adding a new Markdown file in there will create a new blog post.

The Ghost blog posts are fetched using Ghost's Content API library.

## ✨&nbsp;&nbsp;Getting Started

Let's start by making this starter yours:

- Click **Use this template** at the
  [starter page on GitHub](https://github.com/fission-suite/nextjs-blog-starter-typescript-ghost)

  That will make a copy of the starter into a new repo under your account with
  a fresh git history. You can pick a different name for it too; in that case
  replace `nextjs-blog-starter-typescript-ghost` with your chosen name below.

- Clone the repo (replace with your own URL):
  ```
  git clone git@github.com:fission-suite/nextjs-blog-starter-typescript-ghost.git
  ```
- cd into the repo:
  ```
  cd nextjs-blog-starter-typescript-ghost
  ```
- Install dependencies
  ```
  yarn
  ```

All command-line instructions and directory paths from now on assume the
current directory is the root of the cloned repo.

### 👻&nbsp;&nbsp;Setting Up Ghost

#### Public or Local Ghost?

Running a local Ghost instance is good for testing. But also, if you have no
need for a Ghost instance running all the time out on the internet (for
example, if you are the only author) you can do this for your production
website, using Ghost locally for its nice interface if you prefer that to
editing Markdown files. No servers to secure, no bills to pay.

#### Setting Up Local Ghost

If you have a Ghost instance running already somewhere, move on to the next
step. If you don't, you can set one up on your own machine with Docker.

To create a local Ghost instance with Docker, run the following at the root of
your repo:

```bash
yarn ghost-local-create
```

Ghost data will be stored at `./ghost`, which is in `.gitignore` by default. In
a **private** repo you can choose to commit that too and have your Ghost
content versioned and available whenever you need it.

There are other scripts like `ghost-local-start`, `ghost-local-stop`, and
`ghost-local-remove` which you might find handy to manage the Docker container.

After Docker downloads and sets up Ghost, it will be accessible on your browser
at http://localhost:3001.

Next you need to create an admin account on your newly-created Ghost. To do
that, visit the admin interface at http://localhost:3001/ghost and follow the
wizard.

#### Exposing the Ghost Content API

I'll use `http://localhost:3001` for the examples, but you can replace that
with your Ghost URL if you have an instance already running somewhere else.

- Go to the admin interface at http://localhost:3001/ghost
- On the left-hand sidebar, click on "Integrations"
- On the Integrations screen, click on
  [+Add custom integration](http://localhost:3001/ghost/#/settings/integrations/new/)
- Give it a name, like `nextjs`, and click "Create" then "Save"

Now the important part:

- On the same screen, you'll find two fields we need: **Content API Key** and
  **API URL**
- Copy those into a new `.env.local` file, like this:

```bash
# .env.local
# replace values with your own
GHOST_API_URL=http://localhost:3001
GHOST_API_KEY=2a9356e4a5214c883ba886e58e
```

⚠️ _This file is ignored by git by default. **Don't** commit `env.local` to git
unless you know what you're doing._

Alright! Ghost part's done.

### 💻&nbsp;&nbsp;Running Next.js Locally

Next.js is the missing static website _head_ to our *head*less Ghost. Let's
stitch them together! This should be enough:

```bash
yarn dev
```

Your blog should be up and running at
[http://localhost:3000](http://localhost:3000)! _(If anything unexpected
happens, please post an
[issue](https://github.com/fission-suite/nextjs-blog-starter-typescript-ghost/issues/new).)_

Now you can change the Next.js website code and the content on Ghost, and
iterate quickly on them in the browser.

_Note: live-reload works for Next.js code and Markdown files; to see changes to
Ghost content you need to refresh the page._

### 🌐&nbsp;&nbsp;Deploying to Fission

When you're ready to publish, the first step is exporting your website to a set
of static files:

```bash
yarn build
```

That should create a directory at `./out` with all your ready-to-publish files.

Next we use the Fission CLI to send that out onto the internets.

#### 🔰&nbsp;&nbsp;Fission CLI Install and Sign Up

To install the Fission command-line interface using brew, run:

```bash
brew tap fission-suite/fission
brew install fission-cli
```

For more ways of installing the Fission CLI, please check the
[documentation](https://guide.fission.codes/developers/installation).

If you don't have a Fission account, you can create one without leaving the
command-line by running:

```bash
fission setup
```

#### 🌱&nbsp;&nbsp;Register New Fission App

You can pick a subdomain or let Fission choose a random one for you.

To host the Next.js website at a random subdomain on `.fission.app`, run:

```bash
fission app register
```

To choose your own subdomain, use the `--name` option like this:

```bash
fission app register --name my-beautiful-subdomain
```

That will create a `fission.yaml` file. **This one is safe to commit to git**,
and you _should_ do that if you want to use the GitHub Action to build and
deploy the website for you. Make sure there is a line saying `build: ./out` in
it. That's the directory where Next.js puts the exported website files.

#### 🚀 &nbsp;&nbsp;Aand... Launch!

One last step:

```bash
fission app publish
```

And you're done! Your website should be up at a random URL returned to you by
the Fission CLI or at `my-beautiful-subdomain.fission.app` if you used the
`--name` option. Yay!

#### 🤖&nbsp;&nbsp;(Semi-)Automatic Deployment with the GitHub Action

If you don't want to run the build locally and deploy to Fission every time you
make a change to the Next.js code or Markdown files (who does?), this starter
comes with **a GitHub Action that automates that for you**.

To get it working you need to set up 3 secrets for your repo. To do that, go to
the **"Settings" > "Secrets"** screen on your GitHub repo, then create a **"New
repository secret"** for each of these:

- `GHOST_API_URL`
- `GHOST_API_KEY`
- `FISSION_KEY`

The values for the `GHOST_API_` fields are the same ones you used for the
`.env.local` file above.

The `FISSION_KEY` was created and stored locally for you by the Fission CLI
when you set it up. Here's how you get it:

```
cat ~/.config/fission/key/machine_id.ed25519 | base64
```

With all 3 secrets set up, you can trigger the `deploy` action manually by
clicking on **"Run workflow" > "Run workflow"**, or see it in action after your
next `git push`.

---

Note:

⚠️&nbsp;&nbsp;To fetch the content from Ghost, **the GitHub Action must be able
to access the URL** entered in the `GHOST_API_URL` secret.

If you are running a local Ghost instance on your machine,
`http://localhost:3001` won't be visible to the outside.

A simple way of exposing your local Ghost instance to a publicly-accessible URL
is by using one of the
[open source alternatives to ngrok](https://github.com/anderspitman/awesome-tunneling)
or [ngrok](https://ngrok.com/) itself.

With ngrok you do something like this:

```
ngrok http 3001
```

⚠️&nbsp;&nbsp;This is great for testing, but **not secure**. Look into using
`https` if you're going to rely on this and don't want your Ghost API key and
data to leak.

---

> Why **"(semi-)**" automatic then? 🤔

Glad you asked. The GitHub Action can detect when you push to the GitHub repo
because **there's a built-in "on push" event** that can be used to **trigger**
it.

But when you create a new post on Ghost or update an existing one, GitHub needs
a way of finding out about it so it can run the deploy action. There's no
`git push` event happening, so the trigger is usually a
[**webhook**](https://docs.github.com/en/rest/reference/actions#create-a-workflow-dispatch-event)
(i.e. a POST request you send to a GitHub API URL.)

🙂&nbsp;&nbsp;Luckily, Ghost comes with the built-in ability to send webhooks
when content changes happen.

🙃&nbsp;&nbsp;***Un*luckily**, though, Ghost doesn't let you customize the
payload that goes in the webhook requests it sends, and GitHub **requires** a
certain field to be present telling it which `ref` (usually a branch) you are
referring to.

Bottom line: **after changing things _on Ghost_, you need to trigger a build
manually**.

You can do that via the GitHub interface ("Actions" > "Continuous Deployment" >
"Run workflow" > "Run workflow"), or by **running the handy script** we added
to this starter:

```
GITHUB_USER=your-username GITHUB_REPO=your-repo GITHUB_AUTH_TOKEN=your-auth-token trigger-github-deploy-action.sh
```

Here's how you can get an
[auth token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

This situation is definitely not ideal, and can be solved with Ghost plugins,
but we wanted to stick to the basic install.

## 🙏&nbsp;&nbsp;Show your support

Please give a&nbsp;&nbsp;⭐️&nbsp;&nbsp;if you liked this project! We
appreciate it :)

## 📝&nbsp;&nbsp;License

<sup>
Licensed under either of <a href="LICENSE-APACHE">Apache License, Version
2.0</a> or <a href="LICENSE-MIT">MIT license</a> at your option.
</sup>

<br>

<sub>
Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in this crate by you, as defined in the Apache-2.0 license, shall
be dual licensed as above, without any additional terms or conditions.
</sub>
