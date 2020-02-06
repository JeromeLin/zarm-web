import {
  NotificationIcon,
  NotificationAPIProps,
  NotificationProps,
  NotificationItemProps,
  NotificationAPI,
  NotificationAPIReturn,
} from '../notification/PropsType';

export type MessageIcon = NotificationIcon;
export type MessageAPIProps = NotificationAPIProps;
export type MessageItemProps = NotificationItemProps;
export type MessageProps = NotificationProps;
export type MessageAPIReturn = NotificationAPIReturn;

export interface MessageAPI extends NotificationAPI {
  loading(props: MessageAPIProps): MessageAPIReturn;
}
