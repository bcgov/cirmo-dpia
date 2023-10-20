/*
* Every sidenav item has a name, title, style, class, link and enable.
* The name is used to identify the item in the side nav.
* The title is used to display the item in the side nav.
* The style is used to add style to the item in the side nav.
* The class is used to add class to the item in the side nav
* The enable is used to activate the attribute. Can be used to work on features without enabling it.
* The active is used to set the active attribute on the item in the side nav. This is used to highlight 
  the current active item in the side nav.
*/
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';

export interface SideNavAttributes {
  [name: string]: {
    title: string;
    style: string;
    class: string;
    link: string;
    enable: boolean;
    active: boolean;
    activeclass: string;
  };
}

export interface SideNavProps {
  pia: IPiaForm;
  isNewForm: boolean;
  isReadOnly: boolean;
}
