import { ReactElement } from 'react';
import { CalloutProps } from './interfaces';

const Callout = ({ text, type, className }: CalloutProps): ReactElement => {
  return (
    <section className={'callout-section' + (className ? ` ${className}` : '')}>
      <div
        className={
          type === 'piaBannerStatus' ? ' callout pia-callout' : 'callout'
        }
      >
        {text}
      </div>
    </section>
  );
};

export default Callout;
