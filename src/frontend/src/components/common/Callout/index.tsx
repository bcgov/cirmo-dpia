import { ReactElement } from 'react';
import { CalloutProps } from './interfaces';

const Callout = ({ text }: CalloutProps): ReactElement => {
  return (
    <section className="callout-section">
      <div className="callout">{text}</div>
    </section>
  );
};

export default Callout;
