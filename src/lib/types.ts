export enum MESSAGE_TYPES {
  GENERAL_SETTINGS_UPDATED = 'GENERAL_SETTINGS_UPDATED',
  OPEN_OPTIONS = 'OPEN_OPTIONS',
}

export type Theme = 'dark' | 'light';

export interface Message {
  type: MESSAGE_TYPES;
  data?: unknown;
}

export const GENERAL_SETTINGS_KEY = 'generalSettings';

export interface GeneralSettings {
  theme: Theme;
  hide_sidebar_button: boolean;
}
