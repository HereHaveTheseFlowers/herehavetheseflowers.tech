/* eslint-disable @typescript-eslint/ban-ts-comment */
import { set } from './helpers';
import { EventBus } from './EventBus';

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    let eventname = keypath
    if(eventname.includes('.')) {
      eventname = keypath.substring(0, keypath.indexOf('.'));
    }
    this.emit(eventname, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

if(window.localStorage.getItem("theme")) {
  store.set("theme", window.localStorage.getItem("theme"))
} else {
  store.set("theme", "light")
}
if(window.navigator.language === "ru") {
  store.set("lang", "ru")
} else {
  store.set("lang", "en")
}
store.set("categories", ["web", "blog", "music", "about me"])
store.set("blocks", [{ name: "loading" }])

export default store;
