import { useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import { useOutletContext } from 'react-router-dom';
import { isMPORole } from '../../../../utils/helper.util';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAForm';

import { ICollectionUseAndDisclosure } from './CollectionUseAndDisclosure';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ColumnMetaData, Table } from '../../../common/Table';
import { setNestedReactState } from '../../../../utils/object-modification.util';

const PIACollectionUseAndDisclosure = () => {
  const [pia, piaStateChangeHandler, isReadOnly, accessControl] =
    useOutletContext<
      [IPiaForm, PiaStateChangeHandlerType, boolean, () => void]
    >();

  if (accessControl) accessControl();

  const defaultState: ICollectionUseAndDisclosure = useMemo(
    () => ({
      steps: [
        { drafterInput: '', mpoInput: '', foippaInput: '', OtherInput: '' },
        { drafterInput: '', mpoInput: '', foippaInput: '', OtherInput: '' },
        { drafterInput: '', mpoInput: '', foippaInput: '', OtherInput: '' },
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
      displayName: Messages.WorkThroughDetails.ColumnDrafterInput.en,
      className: 'border-end',
      numberedLabelPrefix: 'Step',
    },
    {
      key: 'mpoInput',
      displayName: Messages.WorkThroughDetails.ColumnMpoInput.en,
      hint: Messages.WorkThroughDetails.columnHint.en,
      isDisable: !isMPORole(),
    },
    {
      key: 'foippaInput',
      displayName: Messages.WorkThroughDetails.ColumnFoippaInput.en,
      hint: Messages.WorkThroughDetails.columnHint.en,
      isDisable: !isMPORole(),
    },
    {
      key: 'OtherInput',
      displayName: Messages.WorkThroughDetails.ColumnOtherInput.en,
      hint: Messages.WorkThroughDetails.columnHint.en,
      isDisable: !isMPORole(),
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
      <section className="card p-3">
        <Table
          data={collectionUseAndDisclosureForm.steps}
          columnsMeta={columns}
          onChangeHandler={(updatedData) => {
            stateChangeHandler(updatedData, 'steps');
          }}
          readOnly={isReadOnly}
        />
      </section>

      <h3 className="pt-5 pb-2">{Messages.CollectionNotice.Title.en}</h3>

      <section className=" card pt-5 px-5">
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
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PIACollectionUseAndDisclosure;
