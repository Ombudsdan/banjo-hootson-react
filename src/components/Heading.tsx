import { createElement } from "react";
import { HeadingLevel, IHeading } from "model/heading";

export default function Heading({
  level = HeadingLevel.H2,
  text,
  classNames,
}: IHeading) {
  return createElement(level, { className: classNames }, text);
}
