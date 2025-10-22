import { PropsWithChildren } from 'react';

/**
 * Definition-list-style summary view with semantic elements and slots for actions.
 * Exposes a small component set: Container, Row, Key, Value, Actions.
 */
const Container = ({ children }: ISummaryListContainer) => {
  return <dl className="summary-list">{children}</dl>;
};

const Row = ({ children }: ISummaryListRow) => {
  return <div className="summary-list__row">{children}</div>;
};

const Key = ({ children }: ISummaryListKey) => {
  return <dd className="summary-list__key">{children}</dd>;
};

const Value = ({ children }: ISummaryListValue) => {
  return <dd className="summary-list__value">{children}</dd>;
};

const Actions = ({ children }: ISummaryListActions) => {
  return (
    <dd className="summary-list__actions">
      <div>{children}</div>
    </dd>
  );
};

/** SummaryList component bundle */
export default { Container, Row, Key, Value, Actions };

/** Props for SummaryList: {@link Container} */
export interface ISummaryListContainer extends PropsWithChildren {}

/** Props for SummaryList: {@link Row} */
export interface ISummaryListRow extends PropsWithChildren {}

/** Props for SummaryList: {@link Key} */
export interface ISummaryListKey extends PropsWithChildren {}

/** Props for SummaryList: {@link Value} */
export interface ISummaryListValue extends PropsWithChildren {}

/** Props for SummaryList: {@link Actions} */
export interface ISummaryListActions extends PropsWithChildren {}
