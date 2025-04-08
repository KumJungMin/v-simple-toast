type EventHandler = (payload: any) => void;

class EventBus {
  private events: Map<string, EventHandler[]> = new Map();

  on(event: string, handler: EventHandler): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(handler);
  }

  off(event: string, handler: EventHandler): void {
    const handlers = this.events.get(event);
    if (handlers) {
      this.events.set(event, handlers.filter((h) => h !== handler));
    }
  }

  emit(event: string, payload: any): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  }
}

const eventBus = new EventBus();

export default eventBus;
