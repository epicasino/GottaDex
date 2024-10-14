import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    // eslint-disable-next-line
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    // eslint-disable-next-line
    on: (channel: string, listener: (event: any, ...args: any[]) => void) =>
      ipcRenderer.on(channel, listener),
  },
});
