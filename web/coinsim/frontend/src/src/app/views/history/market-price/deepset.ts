import {deepEquals} from './deepequals'

// Extending Set does not work, so this is a wrapper...
export class DeepSet<T> {
  
  wrappedSet: Set<T>;
  size: number;
  
  constructor(iterable: Iterable<T> = []) {
    this.wrappedSet = new Set(iterable);  
    this.size = this.wrappedSet.size;
  }
  
  add(o) {
    for (const i of Array.from(this.wrappedSet)) {
        if (deepEquals(o, i)) {
            return this;
        }
    }
    return this.wrappedSet.add(o);
  }
  
  clear() {
    return this.wrappedSet.clear();
  }
  
  delete(value) {
    return this.wrappedSet.delete(value);
  }
  
  entries() {
    return this.wrappedSet.entries();
  }
  
  forEach(callbackFn, thisArg = null) {
    return this.wrappedSet.forEach(callbackFn, thisArg);
  } 
  
  has(value) {
    return this.wrappedSet.has(value);
  }
  
  keys() {
    return this.wrappedSet.keys();
  }
  
  values() {
    return this.wrappedSet.values();
  }
  
  iterator() {
    return this.wrappedSet[Symbol.iterator]();  
  }
  
}
