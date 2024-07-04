import { footerDirective } from './footer';
import { heroDirective } from './hero';

const plugin = {
  name: 'Website Components by Curvenote',
  directives: [heroDirective, footerDirective],
};

export default plugin;
