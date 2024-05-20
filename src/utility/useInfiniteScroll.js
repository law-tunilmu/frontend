import { useState, useEffect, useCallback } from "react";

import { ThreeDots } from "react-loader-spinner";

export function useInfiniteScroll({loaderRef, dataFetcher, dataLen=2, startIndex=0}) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isNoDataLeft, setIsNoDataLeft] = useState(false);
    const [index, setIndex] = useState(startIndex);

    const fetchData = useCallback(async () => {
        if (isLoading || isNoDataLeft) return;
        setIsLoading(true);
        setErrors({});
        try {
            const newData = await dataFetcher({page:index, page_size:dataLen});
            if (newData.length > 0) {
                setItems(prev => [...prev, ...newData]);
                setIndex((prevIndex) => prevIndex + 1);
            }
            else {
                setIsNoDataLeft(true);
            } 
        } catch (error) {
            setErrors({
                [error.name]: error.value
            });
        } finally {
            setIsLoading(false);
        }
    }, [index, isLoading, isNoDataLeft, dataFetcher, dataLen]);

    useEffect(() => {
        const currentRef = loaderRef.current;
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                fetchData();
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [fetchData, loaderRef]);


    return {items, errors, setErrors, isLoading, isNoDataLeft}
}

export function Loader() {
    return (
        <div className="w-fit h-fit mx-auto">
            <ThreeDots color="gray"/>
        </div>
    );
}

export function NoMoreData() {
    return (
            <div className="w-fit mx-auto my-2 font-semibold text-gray-500/80 text-md text-nowrap">
                ----- End of Page -----
            </div>
    );
}