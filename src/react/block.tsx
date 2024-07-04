import { type NodeRenderer } from '@myst-theme/providers';
import type { GenericMaybeCustomBlockDirective } from './types.js';
import { Hero } from './Hero.js';
import { Footer } from './Footer.js';

export const CustomBlockRenderer: NodeRenderer = ({
  node,
}: {
  node: GenericMaybeCustomBlockDirective;
}) => {
  switch (node.kind) {
    case 'hero': {
      return <Hero node={node} />;
    }
    case 'footer': {
      return <Footer node={node} />;
    }
    default:
      return null;
  }
};
