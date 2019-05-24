declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type Merge<T, K> = Omit<T, keyof K> & K;
