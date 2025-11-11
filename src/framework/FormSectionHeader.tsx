import Heading from './Heading';
import { HeadingLevel, HeadingLevelType } from 'enums';
import { PropsWithChildren } from 'react';

/**
 * Section header for forms with optional action area as children.
 */
export default function FormSectionHeader({
  title,
  headingLevel = HeadingLevel.H2,
  children,
  isRequired
}: IFormSectionHeader) {
  return (
    <div className="form-section-header">
      <Heading
        level={headingLevel}
        text={title}
        classNames={`form-section-header__title ${isRequired ? 'form-section-header__title--required' : ''}`}
      />
      {children}
    </div>
  );
}

/** Props for {@link FormSectionHeader}. */
interface IFormSectionHeader extends PropsWithChildren {
  title: string;
  headingLevel?: HeadingLevelType;
  isRequired?: boolean;
}
