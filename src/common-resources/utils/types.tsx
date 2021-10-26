type Values<T extends {}> = T[keyof T]

type Tuplize<T extends {}[]> = Pick<T, Exclude<keyof T, Extract<keyof {}[], string> | number>>

type _OneOf<T extends {}> = Values<{
    [K in keyof T]: T[K] & {
    [M in Values<{ [L in keyof Omit<T, K>]: keyof T[L] }>]?: undefined
}
}>

export type OneOf<T extends {}[]> = _OneOf<Tuplize<T>>

export type Complete<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P] | undefined);
}

export type Required<T> = {
    [P in keyof T]-?: T[P]
}

export type RequireOne<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X]
} & {
    [P in K]-?: T[P]
}

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T | U) extends { [ key: string ]: any } ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }