import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import { isMPORole } from '../../../../utils/user';

import { ICollectionUseAndDisclosure } from './CollectionUseAndDisclosure';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Table } from '../../../common/Table';
import { ColumnMetaData } from '../../../common/Table/interfaces';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import { TextInputEnum } from '../../../../constant/constant';

const PIACollectionUseAndDisclosure = () => {
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  const defaultState: ICollectionUseAndDisclosure = useMemo(
    () => ({
      steps: [
        { drafterInput: '', mpoInput: '', foippaInput: '', OtherInput: '' },
      ],
      collectionNotice: { drafterInput: '', mpoInput: '' },
    }),
    [],
  );

  const initialFormState = useMemo(
    () => pia.collectionUseAndDisclosure || defaultState,
    [defaultState, pia.collectionUseAndDisclosure],
  );
  const [collectionUseAndDisclosureForm, setCollectionUseAndDisclosureForm] =
    useState<ICollectionUseAndDisclosure>(initialFormState);

  const stateChangeHandler = (value: any, path: string) => {
    setNestedReactState(setCollectionUseAndDisclosureForm, path, value);
  };

  const columns: Array<ColumnMetaData> = [
    {
      key: 'drafterInput',
      label: Messages.WorkThroughDetails.ColumnDrafterInput.en,
      type: TextInputEnum.INPUT_TEXT_AREA,
    },
    {
      key: 'mpoInput',
      label: Messages.WorkThroughDetails.ColumnMpoInput.en,
      isDisable: !isMPORole(),
      type: TextInputEnum.INPUT_TEXT,
    },
    {
      key: 'foippaInput',
      label: Messages.WorkThroughDetails.ColumnFoippaInput.en,
      isDisable: !isMPORole(),
      type: TextInputEnum.INPUT_TEXT,
    },
    {
      key: 'OtherInput',
      label: Messages.WorkThroughDetails.ColumnOtherInput.en,
      isDisable: !isMPORole(),
      type: TextInputEnum.INPUT_TEXT,
    },
  ];

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, collectionUseAndDisclosureForm)) {
      piaStateChangeHandler(
        collectionUseAndDisclosureForm,
        'collectionUseAndDisclosure',
      );
    }
  }, [piaStateChangeHandler, collectionUseAndDisclosureForm, initialFormState]);

  return (
    <>
      <h2 className="results-header">
        <b>{Messages.Headings.Title.en}</b>
      </h2>
      <span>{Messages.Headings.Subtitle.en}</span>
      <h3 className="pt-4 pb-2">{Messages.WorkThroughDetails.Title.en}</h3>
      <p> {Messages.WorkThroughDetails.SubTitle.en}</p>
      <section
        className={`drop-shadow card p-4 p-md-5  ${
          selectedSection &&
          selectedSection === PiaSections.COLLECTION_USE_AND_DISCLOSURE_STEPS
            ? 'section-focus'
            : ''
        }`}
      >
        <Table
          data={collectionUseAndDisclosureForm.steps}
          columnsMeta={columns}
          onChangeHandler={(updatedData) => {
            stateChangeHandler(updatedData, 'steps');
          }}
          readOnly={isReadOnly}
          numberedLabelPrefix="Step"
          addRowBtnLabel="Add more steps"
          format="row"
        />
        <ViewComments
          count={
            commentCount?.[PiaSections.COLLECTION_USE_AND_DISCLOSURE_STEPS]
          }
          path={PiaSections.COLLECTION_USE_AND_DISCLOSURE_STEPS}
        />
      </section>

      <h3 className="pt-5 pb-2">{Messages.CollectionNotice.Title.en}</h3>

      <section
        className={`drop-shadow card p-4 p-md-5  ${
          selectedSection &&
          selectedSection ===
            PiaSections.COLLECTION_USE_AND_DISCLOSURE_COLLECTION_NOTICE
            ? 'section-focus'
            : ''
        }`}
      >
        <div className="form-group">
          {!isReadOnly ? (
            <label htmlFor="collectionNoticeDrafter">
              {Messages.CollectionNotice.DrafterInput.Title.PartOne.en}
              <a
                href={Messages.CollectionNotice.DrafterInput.Link.en}
                rel="noreferrer external"
                target="_blank"
              >
                {Messages.CollectionNotice.DrafterInput.Title.LinkText.en}
                <FontAwesomeIcon
                  className="helper-text__link-icon"
                  icon={faUpRightFromSquare}
                />
              </a>
              {Messages.CollectionNotice.DrafterInput.Title.PartThree.en}
            </label>
          ) : (
            <h4>
              {Messages.CollectionNotice.DrafterInput.Title.PartOne.en}
              {Messages.CollectionNotice.DrafterInput.Title.LinkText.en}
              {Messages.CollectionNotice.DrafterInput.Title.PartThree.en}
            </h4>
          )}
          {!isReadOnly && (
            <div className="section__question-hint">
              {Messages.CollectionNotice.DrafterInput.Description.en}
            </div>
          )}
          <div className="richText" id="drafterDisclosure">
            {(isReadOnly &&
              !collectionUseAndDisclosureForm.collectionNotice.drafterInput) ||
            (isReadOnly &&
              collectionUseAndDisclosureForm.collectionNotice.drafterInput ===
                '') ? (
              <p>
                <i>Not answered </i>
              </p>
            ) : isReadOnly ? (
              <MDEditor.Markdown
                source={
                  collectionUseAndDisclosureForm?.collectionNotice?.drafterInput
                }
                aria-label="Collection Notice Drafter Textarea Input Preview"
              />
            ) : (
              <MDEditor
                id="collectionNoticeDrafter"
                preview="edit"
                value={
                  collectionUseAndDisclosureForm?.collectionNotice?.drafterInput
                }
                defaultTabEnable={true}
                onChange={(value) => {
                  stateChangeHandler(value, 'collectionNotice.drafterInput');
                }}
                aria-label="Collection Notice Drafter Textarea Input"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          {!isReadOnly ? (
            <label htmlFor="collectionNoticeMPO" className="pt-5">
              {Messages.CollectionNotice.MpoInput.Title.en}
            </label>
          ) : (
            <h4 className="pt-5">
              {Messages.CollectionNotice.MpoInput.Title.en}
            </h4>
          )}
          <div className="richText pb-4" id="MPOCommentsDisclosure">
            {(isReadOnly &&
              !collectionUseAndDisclosureForm.collectionNotice.mpoInput) ||
            (isReadOnly &&
              collectionUseAndDisclosureForm.collectionNotice.mpoInput ===
                '') ? (
              <p>
                <i>Not answered</i>
              </p>
            ) : isReadOnly ? (
              <MDEditor.Markdown
                source={
                  collectionUseAndDisclosureForm?.collectionNotice?.mpoInput
                }
                aria-label="Collection Notice MPO Textarea Input Preview"
              />
            ) : (
              <MDEditor
                id="collectionNoticeMPO"
                preview={isMPORole() ? 'edit' : 'preview'}
                value={
                  collectionUseAndDisclosureForm?.collectionNotice?.mpoInput
                }
                defaultTabEnable={true}
                onChange={(value) => {
                  stateChangeHandler(value, 'collectionNotice.mpoInput');
                }}
                aria-label="Collection Notice MPO Textarea Input"
              />
            )}
          </div>
        </div>
        <ViewComments
          count={
            commentCount?.[
              PiaSections.COLLECTION_USE_AND_DISCLOSURE_COLLECTION_NOTICE
            ]
          }
          path={PiaSections.COLLECTION_USE_AND_DISCLOSURE_COLLECTION_NOTICE}
        />
      </section>
    </>
  );
};

export default PIACollectionUseAndDisclosure;
