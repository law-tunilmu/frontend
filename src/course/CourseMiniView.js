import { Link } from "react-router-dom";

export function CourseMiniView({courseHeaderData}) {
    const data = courseHeaderData;
    return (
        <div key={data.id} className="border-2 border-solid flex flex-row gap-[0.5rem] max-h-[12rem] px-2 py-2">
            <div className="basis-2/5 lg:basis-1/5">
                <img 
                    src="https://res.cloudinary.com/dwlvcqj0u/image/upload/v1696150547/cld-sample-5.jpg"
                    className="w-full h-full" 
                    alt="a picture"
                />
            </div>
            <div className="grid grid-rows-7 grid-cols-1 basis-3/5 lg:basis-4/5 text-sm sm:text-md">
                <div className="font-bold text-wrap truncate">
                    <Link to={`course/${data.id}`} className="text-blue-500"><h2>{data.title}</h2></Link>
                </div>
                <div className="w-4/5 text-wrap truncate"><a href="#" className="text-green-700">{data.creator}</a></div>
                <div className="flex flex-row items-center"><span className="font-bold">$ {data.price}</span></div>
                <div className="row-span-4 text-wrap truncate text-justify relative">
                    {data.description}
                    <Link to={`course/${data.id}`}>
                        <div className="absolute bottom-0 right-0 z-1 
                                text-blue-500 backdrop-blur-md rounded-3xl bg-white/30 
                                p-2 font-bold hover:bg-sky-200"
                        >
                            Check Course
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}