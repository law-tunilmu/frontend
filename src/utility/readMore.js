import { useState, useEffect} from "react";

export function useTruncatedElement({ ref }) {
    const [isTruncated, setIsTruncated] = useState(false);
    const [isShowingMore, setIsShowingMore] = useState(false);

    useEffect(() => {
        const { offsetHeight, scrollHeight} = ref.current || {};
        if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
            setIsTruncated(true);
        } else {
            setIsTruncated(false);
        }
    }, [ref]);

    const toggleIsShowingMore = () => setIsShowingMore(prev => !prev);

    return [
        isTruncated,
        isShowingMore,
        toggleIsShowingMore
    ];
}