import { u } from 'unist-builder';
import { createId, normalizeLabel, fileError } from 'myst-common';
import { noBooleans } from './utils.js';

export const heroDirective = {
  name: 'hero',
  doc: 'An hero unit with a an optional background image. This will render as a block in any myst theme but can be upgraded to richer hero unit in themes that have specialized renderers for blocks with `kind: hero`.',
  alias: ['banner'],
  arg: { type: String, doc: 'The main title to display in the hero unit' },
  options: {
    tagline: { type: String, doc: 'A tagline to display under the main title' },
    description: { type: String, doc: 'A longer description to display under the tagline' },
    'background-image': { type: String, doc: 'URL of the background image' },
    'background-color': { type: String, doc: 'Background color of the hero unit' },
    'text-color': { type: String, doc: 'Text color within the hero unit' },
    layout: {
      type: String,
      doc: 'Layout of the hero unit (default: `center`), (values:`left`, `center`, `right`)',
      values: ['center', 'left', 'right'],
    },
    padding: {
      type: String,
      doc: 'Padding around the hero unit using a css padding string like `1rem` or `1rem 2rem`',
    },
    'cta-title': { type: String, doc: 'Text for the call to action button' },
    'cta-url': { type: String, doc: 'URL for the call to action button' },
    'cta-title-2': { type: String, doc: 'Text for the call to action button' },
    'cta-url-2': { type: String, doc: 'URL for the call to action button' },
    'cta-style': {
      type: String,
      doc: 'Style of the call to action button (default: `light`), (values: `light`, `dark`)',
    },
  },
  run(data, vfile, ctx) {
    function parseInlineMyst(myst) {
      // aims to parge myst text and return the children or the implicit paragraph
      return myst ? ctx.parseMyst(myst)?.children[0].children : undefined;
    }

    const json = {
      backgroundColor: noBooleans(data.options['background-color']),
      textColor: noBooleans(data.options['text-color']),
      padding: noBooleans(data.options.padding),
      ctaStyle: ['light', 'dark'].includes(data.options['cta-style'])
        ? noBooleans(data.options['cta-style'])
        : undefined,
    };

    const { identifier, label, html_id } = normalizeLabel(data.arg) || {};
    const id = {
      title: identifier,
      tagline: data.options.tagline ? createId() : undefined,
      description: data.options.description ? createId() : undefined,
      cta: data.options['cta-title'] ? createId() : undefined,
      cta2: data.options['cta-title-2'] ? createId() : undefined,
      backgroundImage: data.options['background-image'] ? createId() : undefined,
    };

    const parsed = {
      title: parseInlineMyst(data.arg),
      tagline: parseInlineMyst(data.options.tagline),
      description: parseInlineMyst(data.options.description),
      ctaTitle: parseInlineMyst(data.options['cta-title']),
      ctaTitle2: parseInlineMyst(data.options['cta-title-2']),
    };

    const contents = [];

    if (data.options['background-image'])
      contents.push(
        u('image', {
          align: 'center',
          url: data.options['background-image'],
          identifier: id.backgroundImage,
        })
      );

    contents.push(
      u(
        'heading',
        {
          depth: 1,
          identifier,
          label,
          html_id,
          implicit: true,
        },
        parsed.title
      )
    );

    if (id.tagline) contents.push(u('blockquote', { identifier: id.tagline }, parsed.tagline));
    if (id.description)
      contents.push(u('paragraph', { identifier: id.description }, parsed.description));

    if (id.cta || id.cta2) {
      const ctas = [];

      if (parsed.ctaTitle && data.options['cta-url']) {
        ctas.push(
          u('listItem', [
            u('link', { identifier: id.cta, url: data.options['cta-url'] }, parsed.ctaTitle),
          ])
        );
      }

      if (parsed.ctaTitle2 && data.options['cta-url-2']) {
        ctas.push(
          u('listItem', [
            u('link', { identifier: id.cta2, url: data.options['cta-url-2'] }, parsed.ctaTitle2),
          ])
        );
      }

      const list = u('list', { ordered: false, spread: false }, ctas);
      contents.push(list);
    }

    const block = u(
      'block',
      {
        kind: 'hero',
        data: {
          ...data.node.data,
          ...json,
          identifiers: id,
        },
      },
      contents
    );

    return [block];
  },
};
