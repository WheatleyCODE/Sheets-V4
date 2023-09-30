export const callOnFulfilled = (b: { type: string }, cb: () => void) => {
  if (b.type.split('/').pop() === 'fulfilled') cb();
};
