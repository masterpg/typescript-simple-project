function displayMessage(msg: string) {
  const msgEl = document.getElementById('message') as HTMLElement;
  msgEl.textContent = `Hello ${msg}`;
}

displayMessage('World!');