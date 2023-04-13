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
