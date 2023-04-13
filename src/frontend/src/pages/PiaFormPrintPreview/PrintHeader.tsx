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
import BC_logo_Horizontal from '../../assets/BC_logo_Horizontal.png';

const PrintHeader = (pia: any) => {
  return (
    <div className="print-header-container d-flex">
      <img src={BC_logo_Horizontal} alt="BC Gov Logo" />
      <div className="last-modified">
        Last modified:
        <div>{pia?.updatedAt}</div>
      </div>
    </div>
  );
};

export default PrintHeader;
