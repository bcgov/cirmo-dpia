/* 
    This component is used to render the signature section of the PIA form.
    It will render the signature block component for each role in the PIA.
    @param data - the PIA object
    @returns - the signature section component
    @example
    <SignatureSection data={pia} />
*/

import SignatureBlock from './signatureBlock';
import { ISignatureBlock } from './interface';

const SignatureSection = (data: ISignatureBlock | null) => {
  const signatureType: string[] = ['name', 'signature', 'date signed'];
  return (
    data && (
      <div className="signature-section">
        {data?.title && <h3 className="signature-title">{data.title.en}</h3>}
        {data?.roles &&
          Object.keys(data.roles).map((key: string, divid) => {
            return (
              <div className="signature-wrapper" key={divid}>
                <b>
                  <i>{Object(data.roles)[key].title.en}</i>
                </b>
                {Object(data.roles)[key].subtitle && (
                  <p>
                    <i>{Object(data.roles)[key].subtitle.en}</i>
                  </p>
                )}
                <div className="signature-container d-flex">
                  {signatureType.map((text: string, id) => (
                    <SignatureBlock text={text} key={id} />
                  ))}
                </div>
              </div>
            );
          })}
        {data?.comments && (
          <div className="signature-comments">
            {data.comments.title.en}
            <div className="comment-box"></div>
          </div>
        )}
      </div>
    )
  );
};

export default SignatureSection;
