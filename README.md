<img align="right" src="logo.png" height=80>

# Awesome Website Components for MyST Markdown websites

The plugin currently includes:

- Hero
- Footer

## Setup and Usage

This package is published on `npm` and holds a MyST Markdown plugin for use on command line when building your website and a set of front end React components and functions that can be built into a custom theme.

To install the plugin in your MyST project:

1. Download the javascript module (`web.mjs`) from [https://unpkg.com/myst-ext-web@1.0.0/dist/web.mjs](https://unpkg.com/myst-ext-web@1.0.0/dist/web.mjs) and save this in your project folder
1. Add the module to the list of plugins in `myst.yml`:

```yaml
project:
  plugins:
    - web.mjs
```

The plugin will be loaded when you next run `myst start`

```sh
myst start

🔌 Website Components by Curvenote (web.mjs) loaded: 2 directives, 0 roles, 0 transforms
📖 Built example.md in 4.68 ms.
📚 Built 1 page for project in 30 ms.


        ✨✨✨  Starting Article Theme  ✨✨✨



🔌 Server started on port 3001!  🥳 🎉


        👉  http://localhost:3001  👈

```

Then add roles and directives to your pages.

- Hero
- Footers

** TODO: document**

> [!TIP]
> MyST Markdown's plugin loading system is still developing, [look out for updates](https://mystmd.org/guide/plugins) on easier ways to access and load plugins.

### Directive Usage

**TODO: Options**

### React Component Usage

**TODO: Docs**

## Developing

This repo builds the plugin and it's dependencies into a single javascript module bundle using `tusp`.

1. clone this repo
1. `cd myst-ext-web`
1. `npm install`
1. `npm build`

## Contributing

Issues and PRs to extend this plugin are welcome!
