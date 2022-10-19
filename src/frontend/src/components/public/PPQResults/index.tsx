import Card from '../../common/Card';
import { CardProps } from '../../common/Card/interfaces';
import ppqTestResults from './test-ppq-results';

const PPQResults = () => {
  return (
    <div className="results-wrapper">
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
        {ppqTestResults.map((card: CardProps) => {
          return <Card key={card.id} {...card} />;
        })}
      </div>
      <div className="horizontal-divider"></div>
      <div className="form-buttons">
        <button className="btn-secondary btn-back">Back</button>
        <button className="btn-primary btn-next">Next</button>
      </div>
    </div>
  );
};

export default PPQResults;
