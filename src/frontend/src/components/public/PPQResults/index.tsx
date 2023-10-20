import Card from '../../common/Card';
import { CardProps } from '../../common/Card/interfaces';
import ppqResultByComplexity from './ppq-result-by-complexity';
import { Link } from 'react-router-dom';
import { IComponentProps } from './interfaces';

const PPQResults = (props: IComponentProps) => {
  return (
    <div className="results results-wrapper ppq-connect">
      <h1 className="results-header">Review Results</h1>
      <section className="callout-section results-callout-section">
        <div className="callout results-callout">
          <span>
            These results are an estimation <strong>only</strong>, designed to
            give you and your Ministry Privacy Officer (MPO) a rough idea of
            what to expect for your Privacy Impact Assessment (PIA).
          </span>
        </div>
      </section>
      <div className="cards">
        {!props.result.complexity && (
          <div> Something went wrong. Please try again.</div>
        )}

        {ppqResultByComplexity(props.result.complexity).map(
          (card: CardProps) => {
            return <Card key={card.id} {...card} />;
          },
        )}
      </div>
      <div className="horizontal-divider"></div>
      <div className="form-buttons">
        <Link to="/ppq-form" className="btn-secondary btn-back">
          Back
        </Link>
        <Link
          to="/ppq-connect"
          className="bcgovbtn bcgovbtn--primary btn-next"
          state={{ result: props.result }}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default PPQResults;
