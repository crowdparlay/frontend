import {createEffect, createEvent, sample} from 'effector';
import {ExternalToast, toast} from 'sonner';

export interface AlertOptions {
  message: string;
  data?: ExternalToast;
}

export const showNotificationFx = createEffect((payload: AlertOptions) => {
  toast(payload.message, payload.data);
});

export const showNotification = createEvent<AlertOptions>();

sample({
  clock: showNotification,
  target: showNotificationFx,
});
