import { MutableRefObject, useEffect } from 'react';

type UseClickOutsideType = (
    ref: MutableRefObject<HTMLElement | null>,
    callback: () => void
) => void;

export const useClickOutside: UseClickOutsideType = (ref, callback) => {
    useEffect(() => {
        let startedInside = false;

        const listener = (event: MouseEvent) => {
            // Do nothing if `mousedown` or `touchstart` started inside ref element
            if (startedInside) {
                return;
            }
            // Do nothing if clicking ref's element or descendent elements

            if (
                !ref.current ||
                (event.target instanceof HTMLElement &&
                    ref.current.contains(event.target))
            ) {
                return;
            }

            callback();
        };

        const validateEventStart = (event: MouseEvent | TouchEvent) => {
            if (event.target instanceof HTMLElement) {
                startedInside = !!ref.current && ref.current === event.target;
            }
        };

        document.addEventListener('mousedown', validateEventStart);
        document.addEventListener('touchstart', validateEventStart);
        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('mousedown', validateEventStart);
            document.removeEventListener('touchstart', validateEventStart);
            document.removeEventListener('click', listener);
        };
    }, [ref, callback]);
};
