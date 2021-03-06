import IQueue from '../../src/Queue/IQueue';
import { HeapPriorityQueue } from '../../src';
import { EmptyStructureError } from '../../src/exceptions';

describe('HeapPriorityQueue', () => {
  let queue: IQueue<number>;

  beforeEach(() => {
    queue = new HeapPriorityQueue();
  });

  describe('length', () => {
    it('should initialized with 0', () => {
      expect(queue.length).toEqual(0);
    });
  });

  describe('enqueue', () => {
    it('should increase length by 1', () => {
      queue.enqueue(12);
      expect(queue.length).toEqual(1);
    });

    it('should insert according to its priority to the queue (1)', () => {
      queue.enqueue(12);
      queue.enqueue(12);
      queue.enqueue(36);
      queue.enqueue(24);

      const returned = queue.toString();
      expect(returned).toEqual('[ 36 24 12 12 ]');
    });

    it('should insert according to its priority to the queue (2)', () => {
      queue.enqueue(12);
      queue.enqueue(48);
      queue.enqueue(-12);
      queue.enqueue(12);
      queue.enqueue(36);
      queue.enqueue(24);

      const returned = queue.toString();
      expect(returned).toEqual('[ 48 36 24 12 12 -12 ]');
    });
  });

  describe('dequeue', () => {
    it('should throw an EmptyStructureError when called right after initialization', () => {
      expect(() => {
        queue.dequeue();
      }).toThrowError(EmptyStructureError);
    });

    it('should decrease length by 1', () => {
      queue.enqueue(12);
      queue.dequeue();

      expect(queue.length).toEqual(0);
    });

    it('should return data of top priority of the queue', () => {
      queue.enqueue(12);
      queue.enqueue(24);

      const returned = queue.dequeue();
      expect(returned).toEqual(24);
    });

    it('should pop data of top priority from the queue', () => {
      queue.enqueue(12);
      queue.enqueue(24);
      queue.dequeue();

      const returned = queue.toString();
      expect(returned).toEqual('[ 12 ]');
    });

    it('should throw an EmptyStructureError when queue is empty', () => {
      queue.enqueue(12);
      queue.enqueue(24);
      queue.dequeue();
      queue.dequeue();

      expect(() => {
        queue.dequeue();
      }).toThrowError(EmptyStructureError);
    });
  });

  describe('front', () => {
    it('should throw an EmptyStructureError when called right after initialization', () => {
      expect(() => {
        queue.front();
      }).toThrowError(EmptyStructureError);
    });

    it('should return the front which is data of top priority (1)', () => {
      queue.enqueue(12);
      queue.enqueue(24);

      const returned = queue.front();
      expect(returned).toEqual(24);
    });

    it('should return the front which is data of top priority (2)', () => {
      queue.enqueue(12);
      queue.enqueue(36);
      queue.enqueue(24);
      queue.enqueue(-12);
      queue.enqueue(48);

      const returned = queue.front();
      expect(returned).toEqual(48);
    });

    it('should throw an EmptyStructureError when queue is empty', () => {
      queue.enqueue(12);
      queue.enqueue(24);
      queue.dequeue();
      queue.dequeue();

      expect(() => {
        queue.front();
      }).toThrowError(EmptyStructureError);
    });
  });

  describe('rear', () => {
    it('should throw an EmptyStructureError when called right after initialization', () => {
      expect(() => {
        queue.rear();
      }).toThrowError(EmptyStructureError);
    });

    it('should return the rear which is data of lowest priority (1)', () => {
      queue.enqueue(12);
      queue.enqueue(24);

      const returned = queue.rear();
      expect(returned).toEqual(12);
    });

    it('should return the rear which is data of lowest priority (2)', () => {
      queue.enqueue(12);
      queue.enqueue(36);
      queue.enqueue(24);
      queue.enqueue(-12);
      queue.enqueue(48);

      const returned = queue.rear();
      expect(returned).toEqual(-12);
    });

    it('should throw an EmptyStructureError when queue is empty', () => {
      queue.enqueue(12);
      queue.enqueue(24);
      queue.dequeue();
      queue.dequeue();

      expect(() => {
        queue.rear();
      }).toThrowError(EmptyStructureError);
    });
  });

  describe('toString', () => {
    it('should return "[ ]" when called from empty queue', () => {
      const returned = queue.toString();
      expect(returned).toEqual('[ ]');
    });
  });
});
