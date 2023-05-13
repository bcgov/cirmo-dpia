/*
 * This function will print a header on the print preview page
 * @param pia - the PIA object
 * @returns - the header component
 * @example
 * <PrintHeader pia={pia} />
 *
 * This function must be added to any page that needs to print with
 * a BC Header.
 */
import { useEffect, useState } from 'react';
import BC_logo_Horizontal from '../../assets/BC_logo_Horizontal.png';
import { IPiaForm } from '../../types/interfaces/pia-form.interface';
import { dateToString } from '../../utils/date';

const PrintHeader = ({ pia }: { pia: IPiaForm }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  useEffect(() => {
    if (pia && isImgLoaded) {
      window.print();
    }
  }, [pia, isImgLoaded]);
  return (
    <div className="print-header-container d-flex">
      <img
        src={BC_logo_Horizontal}
        alt="BC Gov Logo"
        onLoad={() => setIsImgLoaded(true)}
      />
      <div className="last-modified">
        Last modified:
        <div>{dateToString(pia?.updatedAt)}</div>
      </div>
    </div>
  );
};

export default PrintHeader;
