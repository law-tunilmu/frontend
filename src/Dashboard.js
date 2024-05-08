import { loremIpsum } from "react-lorem-ipsum";


export default function Dashboard() {
    return (
        <div className="container w-11/12 sm:w-4/5 mx-auto min-h-screen mt-2">
            <div className="flex flex-col w-full gap-1">
                <CourseMiniView />
                <CourseMiniView />
                <CourseMiniView />
                <CourseMiniView />
                <div className="basis-1/5">page no</div>
            </div>
        </div>
    );
}

function CourseMiniView() {
    const data = courseDummyData();

    return (
        <div className="border-2 border-solid flex flex-row gap-[0.5rem] max-h-[14.5rem] px-2 py-2">
            <div className="basis-2/5 lg:basis-1/5">picture</div>
            <div className="grid grid-rows-7 grid-cols-1 basis-3/5 lg:basis-4/5">
                <div className="font-bold text-wrap truncate"><a href="#" className="text-blue-500"><h2>{data.title}</h2></a></div>
                <div className="w-4/5 text-wrap truncate"><a href="#" className="text-green-700">{data.creator}</a></div>
                <div className="flex flex-row items-center"><span className="font-bold">$ {data.price}</span></div>
                <div className="row-span-4 text-wrap truncate text-justify relative">
                    {data.description}
                    <a href="#"><div className="absolute bottom-0 right-0 z-1 text-blue-500 backdrop-blur-md rounded-3xl bg-white/30 p-2 font-bold hover:bg-sky-200">Check Course</div></a>
                </div>
            </div>
        </div>
    )
}

function courseDummyData() {
    const dateNow = new Date();
    let timestamp = `
        ${dateNow.getUTCFullYear()}-${dateNow.getUTCMonth()}-${dateNow.getUTCDay()} 
        ${dateNow.getUTCHours()}-${dateNow.getUTCMinutes()}-${dateNow.getUTCSeconds()}`
    return (
        {
            "title":loremIpsum(),
            "description":loremIpsum({p:4}),
            "price":120.99,
            "creator":loremIpsum(),
            "picture_url":"picture_url",
            "createdAt":timestamp,
            "lastUpdateAt":timestamp,
        }
    )
}