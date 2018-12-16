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
    const [state, trigger] = useRxjs(op, init)
    return <p onClick={() => trigger(3)}>{state}</p>
}

<RxComponent/>

```

Will render 2 in the beginning, then 3 after clicked.

## License

MIT
