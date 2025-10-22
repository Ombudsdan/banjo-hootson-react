import { createElement } from 'react';
import { HeadingLevelType } from 'enums';

export default function Heading({ level = 'h2', text, classNames }: IHeading) {
  return createElement(level, { className: classNames }, text);
}

interface IHeading {
  level?: HeadingLevelType;
  text: string;
  classNames?: string;
}
