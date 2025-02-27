export const lock = <A extends unknown[], R>(fn: (...args: A) => R) => {
  let pending: Promise<R> | null = null;
  return new Proxy(fn, {
    async apply(...args) {
      if (pending == null) {
        pending = Promise.resolve(Reflect.apply(...args));
      }
      const result = await pending;
      pending = null;
      return result;
    },
  });
};
