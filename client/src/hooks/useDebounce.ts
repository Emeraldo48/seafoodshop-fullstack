import {useCallback, useRef} from "react";


export default function useDebounce(callback: (...args: any) => void, delay: number) {
    const timer = useRef<null | NodeJS.Timeout>(null);

    const debouncedCallback = useCallback((...args: any) => {
        if(timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay)
    }, [callback, delay]);

    return debouncedCallback;
}