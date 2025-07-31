export {};

declare global {
  interface ServiceWorkerRegistration {
    readonly sync: SyncManager;
  }
}
