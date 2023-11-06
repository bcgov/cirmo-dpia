const PIAStatusTooltipText = (
  <>
    <b>Incomplete:</b>
    <p>
      This PIA has not been submitted and is only visible to its drafter. Submit
      at any time to get help or a review from the MPO.
    </p>
    <b>Edit in progress:</b>
    <p>
      This PIA has been shared with the MPO (Ministry Privacy Office) and they
      are able to view and guide you as you make changes.
    </p>
    <b>MPO review:</b>
    <p>This PIA is ready for a review by the MPO (Ministry Privacy Office).</p>
    <b>CPO review:</b>
    <p>This PIA is ready for a review by the CPO (Corporate Privacy Office).</p>
    <b>Final review:</b>
    <p>
      Individuals required to review and accept accountability for the PIA are
      able to do so at this time.
    </p>
    <b>Pending completion:</b>
    <p>
      All required individuals have reviewed and accepted accountability.
      Awaiting upload to the PID (Personal Information Directory) to be
      finalized.
    </p>
    <b>Complete:</b>
    <p>PIA is complete.</p>
  </>
);
export default {
  PIAStatus: {
    label: 'PIAStatus',
    tooltip: true,
    tooltipText: PIAStatusTooltipText,
  },
  DraftingInProgress: {
    label: 'DraftingInProgress',
    tooltip: true,
    tooltipText:
      'This PIA has not been submitted and is only visible to its drafter. Submit at any time to get help or a review from the MPO.',
  },
  EditInProgress: {
    label: 'EditInProgress',
    tooltip: true,
    tooltipText:
      'This PIA has been shared with the MPO (Ministry Privacy Office) and they are able to view and guide you as you make changes.',
  },
  MPOReview: {
    label: 'MPOReview',
    tooltip: true,
    tooltipText:
      'This PIA is ready for a review by the MPO (Ministry Privacy Office). ',
  },
  CPOReview: {
    label: 'CPOReview',
    tooltip: true,
    tooltipText:
      'This PIA is ready for a review by the CPO (Corporate Privacy Office). ',
  },
  FinalReview: {
    label: 'FinalReview',
    tooltip: true,
    tooltipText:
      'Individuals required to review and accept accountability for the PIA are able to do so at this time.',
  },
  PendingCompletion: {
    label: 'PendingCompletion',
    tooltip: true,
    tooltipText:
      'All required individuals have reviewed and accepted accountability. Awaiting upload to the PID (Personal Information Directory) to be finalized.',
  },
  Complete: {
    label: 'Complete',
    tooltip: true,
    tooltipText: 'PIA is complete.',
  },
};
