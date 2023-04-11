import { ReactElement } from 'react';
import { CalloutProps } from './interfaces';

const Callout = ({ text, bgWhite }: CalloutProps): ReactElement => {
  return (
    <section className="callout-section">
      <div className={'callout' + (bgWhite ? ' bg-white' : '')}>{text}</div>
    </section>
  );
};

export default Callout;
