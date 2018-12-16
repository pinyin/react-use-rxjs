import { OperatorFunction, Subject, Subscription } from 'rxjs'
import { useEffect, useMemo, useState } from 'react'

export function useRxjs<A, S>(
    op: OperatorFunction<A, S>,
    initialValue: S,
): [S, (a: A) => void] {
    const [state, setState] = useState(initialValue)
    const subject = useMemo(() => new Subject<A>(), [])

    useEffect(() => {
        const subscription = new Subscription()
        subscription.add(subject)
        subscription.add(subject.pipe(op).subscribe(s => setState(s)))
        return () => subscription.unsubscribe()
    }, [])

    return [state, a => subject.next(a)]
}
