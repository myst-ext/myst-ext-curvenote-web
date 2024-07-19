<img align="right" src="logo.png" height=80>

# Awesome Website Components for MyST Markdown websites

The plugin currently includes:

- Hero
- Footer

## Setup and Usage

This package is published on `npm` and holds a MyST Markdown plugin for use on command line when building your website and a set of front end React components and functions that can be built into a custom theme.

To install the plugin in your MyST project:

1. Download the javascript module (`curvenote-web.mjs`) from [https://unpkg.com/myst-ext-curvenote-web@1.0.0/dist/curvenote-web.mjs](https://unpkg.com/myst-ext-curvenote-web@1.0.0/dist/curvenote-web.mjs) and save this in your project folder
1. Add the module to the list of plugins in `myst.yml`:

```yaml
project:
  plugins:
    - curvenote-web.mjs
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

> [!TIP]
> MyST Markdown's plugin loading system is still developing, [look out for updates](https://mystmd.org/guide/plugins) on easier ways to access and load plugins.

### Directive Usage

#### Hero

<dl>
<dt>{arg}</dt>
<dd>(MyST) The main title to display in the hero unit</dd>
<dt>tagline</dt>
<dd>(MyST) A tagline to display under the main title</dd>
<dt>description</dt>
<dd>(MyST) A longer description to display under the tagline</dd>
<dt>background-image</dt>
<dd>(File|String) URL or local path to the background image</dd>
<dt>background-color</dt>
<dd>(String) Background color of the hero unit (e.g. #aabbcc)</dd>
<dt>text-color</dt>
<dd>(String) Text color within the hero unit (e.g. #aabbcc)</dd>
<dt>layout</dt>
<dd>(String) Layout of the hero unit (default: `center`), (values:`left`, `center`, `right`)</dd>
<dt>padding</dt>
<dd>(String) Padding around the hero unit using a css padding string like `1rem` or `1rem 2rem`</dd>
<dt>cta-title</dt>
<dd>(String) Text for the first call to action button</dd>
<dt>cta-url</dt>
<dd>(String) URL for the first call to action button</dd>
<dt>cta-title-1</dt>
<dd>(String) Text for the second call to action button</dd>
<dt>cta-url-1</dt>
<dd>(String) URL for the second call to action button</dd>
<dt>cta-style</dt>
<dd>Style of the call to action button (default: `light`), (values: `light`, `dark`)</dd>
</dl>

#### Footer

<dl>
<dt>logo</dt>
<dd>(File|String) URL or local path to the logo</dd>
<dt>logo-dark</dt>
<dd>(File|String) URL or local path to the dark mode logo</dd>
<dt>logo-title</dt>
<dd>(String) Title of the logo, used as alt text</dd>
<dt>logo-url</dt>
<dd>(String) URL to navigate to when the logo is clicked</dd>
<dt>tagline</dt>
<dd>(MyST) A tagline to display under the logo</dd>
<dt>padding</dt>
<dd>(String) Padding around the hero unit using a css padding string like `1rem` or `1rem 2rem`</dd>
<dt>background-color</dt>
<dd>(String) Background color of the footer (e.g. #aabbcc)</dd>
<dt>text-color</dt>
<dd>(String) Text color of the footer (e.g. #aabbcc)</dd>
<dt>copyright</dt>
<dd>(String|MyST) Text to display at the very bottom of the footer, typically a copyright statement</dd>
<dt>{body}</dt>
<dd>(MyST) The body of the footer should contain links in the form of a list with up to 2 nested lists. Links with [`scienceicon` roles](https://www.npmjs.com/package/@scienceicons/myst) as their titles will be picked up as social icons.</dd>
</dl>

### React Component Usage

**TODO: Docs**

## Developing

This repo builds the plugin and it's dependencies into a single javascript module bundle using `tusp`.

1. clone this repo
1. `cd myst-ext-curvenote-web`
1. `npm install`
1. `npm build`

## Contributing

Issues and PRs to extend this plugin are welcome!
