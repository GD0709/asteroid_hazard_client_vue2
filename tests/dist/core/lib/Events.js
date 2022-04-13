"use strict";
// https://www.davideaversa.it/blog/simple-event-system-typescript/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncEmitter = exports.Emitter = void 0;
class Emitter {
    constructor() {
        this.handlers = [];
    }
    expose() {
        return this;
    }
    on(handler) {
        this.handlers.push(handler);
    }
    off(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    trigger(source) {
        // Duplicate the array to avoid side effects during iteration.
        this.handlers.slice(0).forEach(h => h(source));
    }
}
exports.Emitter = Emitter;
class AsyncEmitter {
    constructor() {
        this.handlers = [];
    }
    on(handler) {
        this.handlers.push(handler);
    }
    off(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    trigger(source) {
        return __awaiter(this, void 0, void 0, function* () {
            this.handlers.slice(0).map(h => h(source));
        });
    }
    triggerAwait(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = this.handlers.slice(0).map(h => h(source));
            yield Promise.all(promises);
        });
    }
    expose() {
        return this;
    }
}
exports.AsyncEmitter = AsyncEmitter;
/* class Dog implements INotifyChanged<Dog>{
    
    constructor(readonly name: string) {}

    private readonly onBark = new Signal<Dog, string>();
    public get BarkEvent(): Signal<Dog, string> {
        return this.onBark;
    }

    public sayWoof() {
        this.onBark.trigger(this, "WOOF!");
    }
}

class DogListener {
    constructor(dog: Dog) {
        let dogBarkHandler = (s: Dog, bark: string) => {
            console.log(`Dog ${dog.name} barked: ${bark}`);
        }
        dog.BarkEvent.on(dogBarkHandler);
    }
} */ 
