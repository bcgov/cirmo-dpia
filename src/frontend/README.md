## State Machine

The state macine can be found under `src/utils/statusList`.

This state controls what actions can be taken at each status in a pia form based on your Keycloak role.

The most common ways to interact with the state machine is by checking privileges using the functions in `src\utils\statusList\common.ts`. One function requires the pia as input and the other just goes by status.

The other way of checking a property of the status list is by using `statusList(pia)?.[pia.status]?.<property>` where `<property>` is the property you want to grab.

### Page Parameters

Some properties of each page in a pia form are controlled by the status list. These will need to be added as Typescript types to `src\utils\statusList\types.ts` such as `ReviewPageParams` and then added to the type `PageParamProperties`.

These can then be set under each status > `Privileges` > `<Role>` > `Pages` > `<Page>`, where `<Role>` is the role such as MPO, CPO, or Drafter, and `<Page>` is the page from Typescript type `Page`.

## Autosave

The `autosave` feature is an essential part of the application, designed to prevent data loss and enhance user experience. It is implemented in the `src/utils/autosave.ts` file.

### How it works

The `autosave` feature automatically saves the user's progress on the PIA form at regular intervals. This ensures that no data is lost if the user forgets to manually save their progress, or if there's an unexpected interruption, such as a power outage or network disconnection.

The `useAutoSave` hook is used to manage the autosave functionality. It uses several state variables to track the current state of the form and whether there are any conflicts or validation errors.

The `upsertAndUpdatePia` function is used to save the current state of the form. It checks if there are any changes to the form and if there are, it sends a request to the server to update the form. If the form is being saved for the first time, it also updates the URL to include the ID of the new form.

The `fetchAndUpdatePia` function is used to fetch the current state of the form from the server and update the local state.

The `useEffect` hook is used to set up the autosave functionality. It sets up a timer that calls the `upsertAndUpdatePia` function every 3 seconds. If there's a conflict or if the title of the form is empty, the autosave is skipped.

### State Variables

- `isEagerSave`: Indicates if an immediate save is requested.
- `isConflict`: Signals if there's a data conflict in the PIA form.
- `lastSaveAlertInfo`: Contains details about the last save attempt, including the type of message (success or error) and visibility.

### Usage

To use the `useAutoSave` hook, simply import it from the `autosave.ts` file and call it in your component. It returns an object with several properties that you can use to interact with the autosave functionality.

### Benefits

The `autosave` feature provides several benefits:

- **Data Loss Prevention**: Regularly saves the form, safeguarding against data loss due to interruptions.
- **Improved User Experience**: Frees users from the need to manually save their progress, allowing them to concentrate on filling out the form.
- **Conflict Resolution**: Proactively checks and resolves data conflicts to maintain consistency.

For a deeper understanding and implementation details, refer to the `autosave.ts` file.
