import {
    Observable,
    isObservable,
    OperatorFunction,
    Subject,
    Subscription,
} from 'rxjs'
import { useEffect, useMemo, useState, InputIdentityList } from 'react'

export function useRxjs<A, S>(
    op: Observable<S> | OperatorFunction<A, S>,
    initialValue: S,
    inputs: InputIdentityList = [],
): [S, (a: A) => void] {
    const [state, setState] = useState(initialValue)
    const subject = useMemo(() => new Subject<A>(), inputs)

    useEffect(
        () => {
            const subscription = new Subscription()
            const pipe: OperatorFunction<A, S> = isObservable(op)
                ? () => op
                : op
            subscription.add(subject)
            subscription.add(subject.pipe(pipe).subscribe(s => setState(s)))
            return () => subscription.unsubscribe()
        },
        [subject],
    )

    const publish = useMemo(() => subject.next.bind(subject), [subject])

    return [state, publish]
}
