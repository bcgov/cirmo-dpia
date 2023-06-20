export interface INavbarPages {
  pages: INavbarItem[];
  CSSclass: string;
  rovingTabIndex?: boolean;
}

/* 
This interface is used to create the side navbar items 
for the PIA form.
Due to the complexliy of the side nav, we have to use
a lot of conditionals to determine what is displayed
and what is not.
To keep things simple we have added a state machine
to the side nav items.
The state machine is used to determine what page to navigate to
next or previous based on the current page, the current state
of the PIA form and the state of the side nav item. This adds
a single source of truth to the side nav navigation.

The state machine is a simple object that helps us determine
what page to navigate to next or previous based on the condtions.
If the codition is true then we navigate to the action page.
If the condition is false then we navigate to the actionFalse page.

The action can be a string, number or object.
If the action is a number then we navigate to the current page index (+/-) the action number. This
will navigate to the previous or next tab in the side nav.
If the action is a string then we navigate to the page with the label that matches the string.
If the action is an object then we navigate to the page with the link that matches the object link.
*/

export interface INavbarItem {
  id: number;
  label: string;
  link: string;
  enable?: boolean;
  onclick?: () => void;
  isDivider?: true;

  state?: {
    [prev: string]: {
      condition: boolean | null | undefined;
      action?:
        | {
            link: string | null;
            title: string | null;
          }
        | number
        | string
        | null;
      actionFalse?:
        | {
            link?: string | null;
            title?: string | null;
          }
        | number
        | string
        | null;
    };
  };

  navDown?: string;
  navUp?: string;
  navId?: string;
}
