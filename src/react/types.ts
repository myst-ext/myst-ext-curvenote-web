import { GenericParent } from 'myst-common';

export interface GenericMaybeCustomBlockDirective {
  type: string;
  kind: string;
  data: {
    identifiers: Record<string, string>;
  } & Record<string, any>;
  children: GenericParent[];
}
