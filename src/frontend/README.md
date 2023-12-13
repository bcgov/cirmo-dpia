## State Machine

The state macine can be found under `src/utils/statusList`.

This state controls what actions can be taken at each status in a pia form based on your Keycloak role.

The most common ways to interact with the state machine is by checking privileges using the functions in `src\utils\statusList\common.ts`. One function requires the pia as input and the other just goes by status.

The other way of checking a property of the status list is by using `statusList(pia)?.[pia.status]?.<property>` where `<property>` is the property you want to grab.

### Page Parameters

Some properties of each page in a pia form are controlled by the status list. These will need to be added as Typescript types to `src\utils\statusList\types.ts` such as `ReviewPageParams` and then added to the type `PageParamProperties`.

These can then be set under each status > `Privileges` > `<Role>` > `Pages` > `<Page>`, where `<Role>` is the role such as MPO, CPO, or Drafter, and `<Page>` is the page from Typescript type `Page`.

---

## Autosave

TBD
