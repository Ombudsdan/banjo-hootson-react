import { createElement } from 'react';
import { HeadingLevelType } from 'enums';

/**
 * Generic heading element factory. Uses `createElement` to render the desired heading level.
 */
export default function Heading({ level = 'h2', text, classNames }: IHeading) {
  return createElement(level, { className: classNames }, text);
}

/** Props for {@link Heading} */
interface IHeading {
  level?: HeadingLevelType;
  text: string;
  classNames?: string;
}
