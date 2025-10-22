import { Heading } from "components";
import { HeadingLevel, HeadingLevelType } from "model/heading";
import { PropsWithChildren } from "react";

export default function FormSectionHeader({
  title,
  headingLevel = HeadingLevel.H2,
  children,
}: IFormSectionHeader) {
  return (
    <div className="form-section-header">
      <Heading
        level={headingLevel}
        text={title}
        classNames="form-section-header__title"
      />
      {children}
    </div>
  );
}

interface IFormSectionHeader extends PropsWithChildren {
  title: string;
  headingLevel?: HeadingLevelType;
}
