declare type Merge<T, K> = Omit<T, keyof K> & K;
