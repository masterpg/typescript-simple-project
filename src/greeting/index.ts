export class Greeting {

  displayMessage(msg: string) {
    const msgEl = document.getElementById('message') as HTMLElement;
    msgEl.textContent = this.getMessage(msg);
  }

  getMessage(msg: string) {
    return `Hello ${msg}`;
  }

}
