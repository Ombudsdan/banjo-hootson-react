import {
  ISummaryList,
  ISummaryListActions,
  ISummaryListKey,
  ISummaryListRow,
  ISummaryListValue
} from 'model/summary-list';

const Container = ({ children }: ISummaryList) => {
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
