import { loremIpsum } from "react-lorem-ipsum";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div className="container w-11/12 sm:w-4/5 mx-auto min-h-screen mt-2">
            <CourseCatalog></CourseCatalog>
            {/* <div className="flex flex-row w-full">
                <div className="collapse sm:border-2 sm:visible sm:basis-4/12 px-4 py-4 h-[50vh]">
                    <h2 className="font-bold text-gray-500 mb-2">Recently Viewed Courses</h2>
                    <div className="flex flex-col overflow-scroll">
                        <RecentlyViewed />
                        <RecentlyViewed />
                        <RecentlyViewed />
                        <RecentlyViewed />
                        <RecentlyViewed />
                    </div>
                </div>
                <div className="sm:basis-8/12"><CourseCatalog></CourseCatalog></div>
            </div> */}
        </div>
    );
}

function RecentlyViewed() {
    let data = {
        "title":loremIpsum(),
        "picture":"path to pic"
    }

    return (
        <a href="#" className="text-blue-500 font-bold hover:text-sky-400">
            <div className="h-[2rem] text-wrap truncate py-1">
                <h2>{data.title}</h2>
            </div>
        </a>
    );
}

function CourseCatalog() {
    return (
        <div className="flex flex-col w-full gap-1">
                <CourseMiniView />
                <CourseMiniView />
                <CourseMiniView />
                <CourseMiniView />
            <div className="basis-1/5">def</div>
        </div>
    );
}

function CourseMiniView() {
    let data = {
        "title":loremIpsum(),
        "description":loremIpsum({p:4}),
        "rating":4.5,
        "creator":loremIpsum(),
        "picture":"path to pic"
    }
    let startComps = [];
    for(let i = 0; i < Math.floor(data.rating); i++) {
        startComps.push(<FaStar color="orange"></FaStar>)
    }
    if (data.rating % 1 !== 0) {
        startComps.push(<FaStarHalfAlt color="orange"></FaStarHalfAlt>)
    }

    return (
        <div className="border-2 border-solid flex flex-row gap-[0.5rem] max-h-[14.5rem] px-2 py-2">
            <div className="basis-2/5 lg:basis-1/5">picture</div>
            <div className="grid grid-rows-7 grid-cols-1 basis-3/5 lg:basis-4/5">
                <div className="font-bold text-wrap truncate"><a href="#" className="text-blue-500"><h2>{data.title}</h2></a></div>
                <div className="w-4/5 text-wrap truncate"><a href="#" className="text-green-700">{data.creator}</a></div>
                <div className="flex flex-row items-center">{[...startComps]} <span className="font-bold px-2">{data.rating}</span></div>
                <div className="row-span-4 text-wrap truncate text-justify relative">
                    {data.description}
                    <a href="#"><div className="absolute bottom-0 right-0 z-1 text-blue-500 backdrop-blur-md rounded-3xl bg-white/30 p-2 font-bold hover:bg-sky-200">Check Course</div></a>
                </div>
            </div>
        </div>
    )
}