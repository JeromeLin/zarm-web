import {
  NotificationReturnInstance,
  NotificationPropsBase,
  NotificationInstance,
  NotificationIcon,
} from '../notification/PropsType';

export type MessageReturnInstance = NotificationReturnInstance;
export type MessageOptions = MessageProps | React.ReactNode;
export type MessageIcon = NotificationIcon;

export interface MessageProps extends NotificationPropsBase {
  icon?: MessageIcon;
}

export interface MessageInstance extends Omit<NotificationInstance, 'open'> {
  loading(props: MessageOptions): MessageReturnInstance;
}
