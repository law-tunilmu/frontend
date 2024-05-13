import { Link } from "react-router-dom";

export function CourseMiniView({courseHeaderData}) {
    const data = courseHeaderData;
    return (
        <div key={data.id} className="border-2 border-solid flex flex-col gap-1 px-2 py-2 w-full">
            <img 
                src="https://res.cloudinary.com/dwlvcqj0u/image/upload/v1696150547/cld-sample-5.jpg"
                className="w-full object-scale-down h-64 sm:h-80" 
                alt="Course Image"
            />
            
            <div className="grid grid-cols-1 text-sm sm:text-md gap-2">
                <Link to={`course/${data.id}`}>
                    <p className="font-bold break-words text-blue-500 line-clamp-3">
                        {data.title}
                    </p>
                </Link>

                <p href="#" className="text-green-700 line-clamp-1 pr-1">
                    <strong className="text-black">created by </strong>{data.creator}
                </p>
                <p className="font-bold">$ {data.price}</p>
                <div className="text-justify relative line-clamp-6">
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