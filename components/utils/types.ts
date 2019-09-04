declare type Merge<T, K> = Omit<T, keyof K> & K;

declare type Defaultize<P, D> = P extends any
  ? string extends keyof P ? P :
  Pick<P, Exclude<keyof P, keyof D>>
  & Partial<Pick<P, Extract<keyof P, keyof D>>>
  & Partial<Pick<D, Exclude<keyof D, keyof P>>>
  : never;

declare type MergeProps<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;
