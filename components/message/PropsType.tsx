import {
  NotificationIcon,
  NotificationOptions,
  NotificationProps,
  NotificationItemProps,
  NotificationInstance,
  NotificationReturnInstance,
} from '../notification/PropsType';

export type MessageIcon = NotificationIcon;
export type MessageOptions = NotificationOptions;
export type MessageItemProps = NotificationItemProps;
export type MessageProps = NotificationProps;
export type MessageReturnInstance = NotificationReturnInstance;

export interface MessageInstance extends NotificationInstance {
  loading(props: MessageOptions): MessageReturnInstance;
}
