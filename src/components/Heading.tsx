import React from "react";

type Props = {
  level?: 2 | 3 | 4 | 5 | 6;
  text: string;
  classNames?: string;
};

export default function Heading({ level = 2, text, classNames = "" }: Props) {
  const tag = `h${level}` as keyof HTMLElementTagNameMap;
  return React.createElement(tag, { className: classNames }, text);
}
