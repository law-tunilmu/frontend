import { ThreeCircles } from "react-loader-spinner";

export function FetchLoader ({isLoading, children}) {
    return (
        <>
            {
                isLoading ? 
                    <div className="mx-auto w-fit h-screen flex items-center">
                        <ThreeCircles color="#03cffc" />
                    </div> : 
                    children
            }
        </>
    );
}

export function SubmitLoader({isLoading, children}) {
    
    return (
        <>
            {
                isLoading ? 
                    <div className="absolute top-0 left-0 flex w-screen h-screen z-[100]
                        items-center justify-center backdrop-blur-sm">
                        <ThreeCircles color="#03cffc" />
                    </div> :
                    children
            }
        </>
    );
}