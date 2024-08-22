import {HttpTransportType, HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {createEffect, createEvent, createStore, sample} from 'effector';

import {API_URL} from '~/shared/config';

export const signalRFactory = <Message>(methodName: string) => {
  const $connection = createStore<HubConnection | null>(null);

  const startFx = createEffect((connection: HubConnection) => {
    connection.on(methodName, messageReceived);

    return connection.start();
  });

  const start = createEvent<{url: string}>();

  const messageReceived = createEvent<Message>();

  sample({
    clock: start,
    fn: (payload) => {
      return new HubConnectionBuilder()
        .withUrl(new URL(payload.url, API_URL).toString(), {
          transport: HttpTransportType.ServerSentEvents,
        })
        .withAutomaticReconnect()
        .build();
    },
    target: $connection,
  });

  sample({
    clock: start,
    source: $connection,
    filter: Boolean,
    target: startFx,
  });

  startFx.doneData.watch(() => console.log('started'));
  startFx.failData.watch((err) => console.error('failed', err));

  return {
    start,
    messageReceived,
  };
};
