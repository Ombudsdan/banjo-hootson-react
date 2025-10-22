import { PropsWithChildren } from 'react';

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

export default { Container, Row, Key, Value, Actions };

export interface ISummaryListContainer extends PropsWithChildren {}

export interface ISummaryListRow extends PropsWithChildren {}

export interface ISummaryListKey extends PropsWithChildren {}

export interface ISummaryListValue extends PropsWithChildren {}

export interface ISummaryListActions extends PropsWithChildren {}
