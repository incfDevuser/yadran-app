self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Notificación recibida:", data);
  self.registration.showNotification(data.title, {
    body: data.body,
    // icon: "/icon.png",
    data: data.url || "/",
  });
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || "/") 
  );
});
