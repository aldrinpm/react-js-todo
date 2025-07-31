self.addEventListener('sync', event => {
  if (event.tag === 'profile-sync') {
    event.waitUntil(
      (async () => {
        // TODO: Fetch stored profile data from IndexedDB here
        // Then write to Firestore via fetch or Firebase REST API
        console.log('Background sync: uploading profile to Firestore');
      })()
    );
  }
});
