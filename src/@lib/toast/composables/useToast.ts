import eventBus from '../../helpers/eventBus';
import symbol from '../symbol';

export function useToast() {
  function add(message: string): void {
    eventBus.emit(symbol.addToast, { message });
  }
  function remove(id: number): void {
    eventBus.emit(symbol.removeToast, { id });
  }
  return { add, remove };
}