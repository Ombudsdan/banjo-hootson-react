import { PropsWithChildren } from 'react';

/**
 * Definition-list-style summary view with semantic elements and slots for actions.
 * Exposes a small component set: Container, Row, Key, Value, Actions.
 */
const Container = ({ children }: SummaryListContainerProps) => {
  return <dl className="summary-list">{children}</dl>;
};

const Row = ({ children }: SummaryListRowProps) => {
  return <div className="summary-list__row">{children}</div>;
};

const Key = ({ children }: SummaryListKeyProps) => {
  return <dd className="summary-list__key">{children}</dd>;
};

const Value = ({ children }: SummaryListValueProps) => {
  return <dd className="summary-list__value">{children}</dd>;
};

const Actions = ({ children }: SummaryListActionsProps) => {
  return (
    <dd className="summary-list__actions">
      <div>{children}</div>
    </dd>
  );
};

/** SummaryList component bundle */
export default { Container, Row, Key, Value, Actions };

/** Props for SummaryList: {@link Container} */
type SummaryListContainerProps = PropsWithChildren;

/** Props for SummaryList: {@link Row} */
type SummaryListRowProps = PropsWithChildren;

/** Props for SummaryList: {@link Key} */
type SummaryListKeyProps = PropsWithChildren;

/** Props for SummaryList: {@link Value} */
type SummaryListValueProps = PropsWithChildren;

/** Props for SummaryList: {@link Actions} */
type SummaryListActionsProps = PropsWithChildren;
