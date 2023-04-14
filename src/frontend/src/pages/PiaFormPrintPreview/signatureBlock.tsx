/*
 * This function will print the signature line and a text
 * representing what needs to be filled above the line.
 * @param text - the text to be displayed below the line
 * @returns - the signature block component
 * @example
 * <SignatureBlock text="Signature of the PIA Author" />
 */

import { ItextType } from './interface';

const SignatureBlock = (text: ItextType) => {
  return (
    <div className="signature-block">
      <div className="text-line"></div>
      <div className="signature-role">{text.text}</div>
    </div>
  );
};

export default SignatureBlock;
