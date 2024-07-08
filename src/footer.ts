import { u } from 'unist-builder';
import { createId, normalizeLabel, fileError } from 'myst-common';
import { selectAll } from 'unist-util-select';
import { noBooleans } from './utils.js';

export const footerDirective = {
  name: 'footer',
  doc: 'An configurable site footer with a logo, tagline, and links.',
  options: {
    logo: { type: String, doc: 'URL of the logo' },
    'logo-dark': { type: String, doc: 'URL of the logo' },
    'logo-title': { type: String, doc: 'Title of the logo, used as alt text' },
    'logo-url': { type: String, doc: 'URL to navigate to when the logo is clicked' },
    tagline: { type: String, doc: 'A tagline to display under the logo' },
    padding: {
      type: String,
      doc: 'Padding around the hero unit using a css padding string like `1rem` or `1rem 2rem`',
    },
    'background-color': { type: String, doc: 'Background color of the footer' },
    'text-color': { type: String, doc: 'Text color of the footer' },
    copyright: {
      type: String,
      doc: 'Text to display at the very bottom of the footer, typically a copyright statement',
    },
  },
  body: {
    type: String,
    doc: 'The body of the footer should contain links in the form of a list with up to 2 nested lists. Links with `scienceicon` roles as their titles will be picked up as social icons.',
  },
  run(data, vfile, ctx) {
    function parseInlineMyst(myst) {
      // aims to parge myst text and return the children or the implicit paragraph
      return myst ? ctx.parseMyst(myst)?.children[0].children : undefined;
    }

    const json = {
      backgroundColor: data.options['background-color'],
      textColor: data.options['text-color'],
      padding: data.options.padding,
      logoTitle: data.options['logo-title'],
      logoUrl: data.options['logo-url'],
    };

    const ids = {
      footer: createId(),
      logo: data.options.logo ? createId() : undefined,
      logoDark: data.options['logo-dark'] ? createId() : undefined,
      tagline: data.options.tagline ? createId() : undefined,
      linkList1: createId(),
      linkList2: createId(),
      copyright: data.options.copyright ? createId() : undefined,
      social: createId(),
    };

    const parsed = {
      tagline: parseInlineMyst(data.options.tagline),
      body: ctx.parseMyst(data.body),
      copyright: data.options.copyright ? parseInlineMyst(data.options.copyright) : undefined,
    };

    const lhs = [];

    if (data.options.logo)
      lhs.push(
        u('link', { url: data.options['logo-url'] }, [
          u('image', {
            align: 'left',
            url: data.options.logo,
            identifier: ids.logo,
            alt: data.options['logo-title'],
          }),
        ])
      );
    if (data.options['logo-dark'])
      lhs.push(
        u('link', { url: data.options['logo-url'] }, [
          u('image', {
            align: 'left',
            url: data.options['logo-dark'],
            identifier: ids.logoDark,
            alt: data.options.logoTitle,
          }),
        ])
      );
    if (data.options.tagline) lhs.push(u('paragraph', { identifier: ids.tagline }, parsed.tagline));

    const social = selectAll('link:has(scienceicon)', parsed.body);
    if (social && social.length > 0) {
      lhs.push(u('hr'));
      lhs.push(u('div', { identifier: ids.social }, social));
    }

    const lists = selectAll('list list', parsed.body);
    const rhs = [];

    if (lists[0]?.children) rhs.push(u('list', { identifier: ids.linkList1 }, lists[0].children));
    if (lists[1]?.children) rhs.push(u('list', { identifier: ids.linkList2 }, lists[1].children));

    const block = u(
      'block',
      { kind: 'footer', data: { ...data.node.data, ...json, identifiers: ids } },
      [
        u('div', { class: 'flex justify-between py-2 items-center' }, [
          u('div', { class: 'space-y-1 flex-grow flex flex-col items-start footer__lhs' }, lhs),
          u(
            'div',
            { class: 'space-y-1 flex-grow flex items-top gap-2 justify-center footer__rhs' },
            rhs
          ),
        ]),
      ]
    );

    if (parsed.copyright) {
      block.children.push(u('hr'));
      block.children.push(u('div', { identifier: ids.copyright }, parsed.copyright));
    }

    return [block];
  },
};
