import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react'
import { StageProps } from './interfaces';

const Stage = ({id, label, icon, active}: StageProps): ReactElement => {
    return (
        <>
            <div className={`stage-lead-line ${active ? "active" : ""}`}></div>
            <div className={`stage-block`}>
                <div className={`circle ${active ? "active" : ""}`}>
                    <div className="inner-circle">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                </div>
                <p className="stage-label">{label}</p>
            </div>
        </>
    )
}

export default Stage;
