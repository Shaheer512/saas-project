import { useCallback,useEffect,useRef } from "react";

interface UseInfiniteScrollProps {
    status: "LoadingFirstPage" | "CanLoadMore" | "LoadingMore" | "Exhausted",
    loadMore: (numItems: number) => void;
    loadSize?: number;
    observerEnabled?: boolean;
};

export const UseInfiniteScroll = ({
    status,
    loadMore,
    loadSize = 10,
    observerEnabled = true,
}:UseInfiniteScrollProps) => {
    const topElementRef = useRef<HTMLDivElement>(null);
    const handleLoadMore = useCallback(() => {
        if(status === "CanLoadMore"){
            loadMore(loadSize);
        }
    },[status,loadMore,loadSize]);
    useEffect(() => {
        const topElement = topElementRef.current;
        if(!(topElement && observerEnabled)) {
            return;
        }

        const oberver = new IntersectionObserver(
            ([entry]) => {
                if(entry?.isIntersecting) {
                    handleLoadMore();
                }
            },
            {threshold:0.1}
        );

        oberver.observe(topElement);

        return () => {
            oberver.disconnect();
        };
    },[handleLoadMore,observerEnabled])
    return {
        topElementRef,
        handleLoadMore,
        CanLoadMore: status === "CanLoadMore",
        isLoadingMore:status === "LoadingMore",
        isLoadingFirstPage:status === "LoadingFirstPage",
        isExhausted: status === "Exhausted",
    };
};