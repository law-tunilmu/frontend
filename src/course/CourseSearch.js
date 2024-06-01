import { useMemo, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";

import { useInfiniteScroll, Loader, NoMoreData } from "../utility/useInfiniteScroll";
import CourseCard from "./components/CourseCard";
import BackToTopBtn from "../components/BackToTop";
import ERRORS, { ErrorFetch } from "./components/ErrorPages";

export default function CourseSearch() {
    const [ query, setQuery ] = useState("");
    const [ finalQuery, setFinalQuery ] = useState("");
    const [ isShowCancel, setShowCancel ] = useState(false);
    
    const handleChange = (e) => {
        const newInput = e.target.value;
        setQuery(newInput);

        if (newInput) {
            setShowCancel(true);
        } else {
            setShowCancel(false);
        }
    }

    const resetQuery = () => {
        setQuery("");
        setFinalQuery("");
        setShowCancel(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setFinalQuery(query);
        }
    }


    return (
        <>
            <div className="mx-auto relative flex w-[90vw] sm:w-[40vw] h-max mt-8 mb-2">
                <input 
                    type="search"
                    className="inline-flex items-center grow rounded-lg pr-10"
                    placeholder="Search course"
                    value={query}
                    required={true}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    />
                {
                    isShowCancel &&
                    <div className="absolute top-0 bottom-0 right-0 h-fit w-7 my-auto mt-2 z-[10]">
                        <button onClick={resetQuery}>
                            <TiDelete className="size-6"/>
                        </button>
                    </div>
                }
            </div>
            {
                (finalQuery.length > 0) ?
                    <Content key={finalQuery} finalQuery={finalQuery} />:
                    <RandomQuote />
            }
        </>
    );
}

function Content({finalQuery}) {
    const loaderRef = useRef();

    const {items, isLoading, isNoDataLeft, errors} = useInfiniteScroll({
        loaderRef: loaderRef,
        dataFetcher: dataFetcher({query: finalQuery})
    });
    return (
        <>
            <ErrorFetch errors={errors} 
                    className="flex items-center justify-center 
                            text-lg md:text-[2rem] w-full 
                            bg-gradient-to-br from-gray-300">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[...items.map((course, idx) => <CourseCard data={course} key={idx}/>)]}
                </div>

                <div ref={loaderRef} className="min-h-[1px]"> { isLoading && <Loader />} </div>
                    

                {isNoDataLeft && items.length > 0 && <NoMoreData />}
                {isNoDataLeft && items.length === 0 && <NoCourseFound />}
            </ErrorFetch>
            <BackToTopBtn />  
        </>
    );
}

function NoCourseFound() {
    return (
        <div className="absolute top-0 h-screen left-0 right-0 w-[inherit] mx-auto z-[-10] 
                        flex flex-col items-center justify-center text-[2rem] text-gray-400 font-bold">
            No courses matched
        </div>
    );
}

function RandomQuote() {
    const quote = useMemo(() => {
        const chosenQuote = Math.floor(Math.random() * NICE_QUOTES.length);
        return NICE_QUOTES.at(chosenQuote);
    }, []);

    return (
        <div className="absolute top-0 h-screen left-0 right-0 w-[inherit] mx-auto z-[-10] 
                        px-4 gap-4 flex flex-col justify-center 
                        text-gray-500 font-semibold font-mono">
            <p className="text-center text-lg md:text-[2rem] italic"><q>{quote.quote}</q></p>
            <p className="self-end text-sm md:text-[1rem]">{quote.name}</p>
        </div>
    );
}

function dataFetcher({query}) {

    return async ({page, page_size}) => {
        const params = new URLSearchParams();
        params.append("query", query);
        params.append("page", String(page));
        params.append("page_size", String(page_size));

        const courseBeUrl = process.env.REACT_APP_COURSE_BE +
                            `/course/search?${params}`;
        try {
            const resp = await axios.get(courseBeUrl);
            return resp.data;
        } catch (error) {
            let name = ERRORS.NETWORK;
            let message = "Network Error. Please check your internet connection";
            if (error.response) {
                name = ERRORS.SERVER;
                message = "Server Error. Please try again later";
            }
            throw {
                name: name,
                message: message
            }
        }
    }
}

// source: https://www.adobe.com/express/learn/blog/25-educational-quotes
const NICE_QUOTES = [
    {name: "Nelson Mandela", quote: "Education is the most powerful weapon which you can use to change the world."},
    {name: "B.B. King", quote: "The beautiful thing about learning is that no one can take it away from you."},
    {name: "William Butler Yeats", quote: "Education is not the filling of a pail, but the lighting of a fire."},
    {name: "Mahatma Gandhi", quote: "Live as if you were to die tomorrow. Learn as if you were to live forever."},
    {name: "Dr. Seuss", quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go."},
    {name: "George Washington Carver", quote: "Education is the key to unlock the golden door of freedom."},
    {name: "Plutarch", quote: "The mind is not a vessel to be filled, but a fire to be kindled." },
    {name: "Benjamin Franklin", quote: "An investment in knowledge pays the best interest."},
    {name: "Malcolm X", quote: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."},
    {name: "Chinese Proverb", quote: "Learning is a treasure that will follow its owner everywhere."}
];