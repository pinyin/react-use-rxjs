import { OperatorFunction, Subject, Subscription } from 'rxjs'
import { useEffect, useRef, useState, useMemo } from 'react'

export function useRxjs<A, S>(
    op: OperatorFunction<A, S>,
    initialValue: S,
): [S, (a: A) => void] {
    const [state, setState] = useState(initialValue)
    const subject = useRef(new Subject<A>())

    useEffect(() => {
        const subscription = new Subscription()
        subscription.add(subject.current)
        subscription.add(subject.current.pipe(op).subscribe(s => setState(s)))
        return () => subscription.unsubscribe()
    }, [])

    return [state, a => subject.current.next(a)]
}
