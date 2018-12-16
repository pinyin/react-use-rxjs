import { useRxjs } from './useRxjs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { create } from 'react-test-renderer'
import * as React from 'react'

describe(`${useRxjs.name}`, () => {
    const op = (input: Observable<number>): Observable<string> => {
        return input.pipe(map(v => v.toString()))
    }
    const init = '2'

    const RxComponent = () => {
        const [state, trigger] = useRxjs(op, init)
        return <p onClick={() => trigger(3)}>{state}</p>
    }

    it(`should emit default value`, () => {
        const renderer = create(<RxComponent />)
        expect(renderer.root.findAllByType('p')[0].children[0]).toEqual('2')
    })

    it(`should update returned value with op`, async () => {
        const renderer = create(<RxComponent />)
        await new Promise(resolve => setTimeout(resolve, 100))
        renderer.root.findAllByType('p')[0].props['onClick']()
        expect(renderer.root.findAllByType('p')[0].children[0]).toEqual('3')
    })
})
