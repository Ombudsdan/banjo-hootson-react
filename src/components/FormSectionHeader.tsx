import Heading from "@/components/Heading";

type Props = {
  title: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
};

export default function FormSectionHeader({
  title,
  headingLevel = 2,
  children,
}: Props) {
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
