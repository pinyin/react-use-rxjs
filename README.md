# react-use-rxjs

Hooks for rxjs

## Install

```
npm install --save react-use-rxjs
```

## Usage

```js
import { useRxjs } from 'react-use-rxjs'

const op = input => {
    return input.pipe(map(v => v.toString()))
}
const init = '2'

const RxComponent = () => {
    const [state, publish] = useRxjs(op, init, [])
    return <p onClick={() => publish(3)}>{state}</p>
}

<RxComponent/>

```

Will render 2 in the beginning, then 3 after clicked.

The first param of `useRxjs` can also be an `Observable`, in which case `state` would be values from the passed Observable and `publish` would be ignored.

The third param of `useRxjs` is optional and works just like the last param of official hooks like `useMemo` or `useEffect`.

## License

MIT
