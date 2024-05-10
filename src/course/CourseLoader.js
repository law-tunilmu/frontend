import { loremIpsum } from "react-lorem-ipsum";

export async function courseLoader({ params }) {
    return courseDummyData(params.id);
}

export function batchCourseLoader({ page, page_size }) {
    const data = [];
    for(let i=1; i < page_size; i++) {
        data.push(courseDummyData(i));
    }
    return data;
}

function courseDummyData(id) {
    const dateNow = new Date();
    let timestamp = `
        ${dateNow.getUTCFullYear()}-${dateNow.getUTCMonth()}-${dateNow.getUTCDay()} 
        ${dateNow.getUTCHours()}-${dateNow.getUTCMinutes()}-${dateNow.getUTCSeconds()}`
    return (
        {
            "id":id,
            "title":loremIpsum(),
            "description":loremIpsum({p:4}),
            "price":120.99,
            "creator":loremIpsum(),
            "picture_url":"https://res.cloudinary.com/dwlvcqj0u/image/upload/v1696150547/cld-sample-5.jpg",
            "createdAt":timestamp,
            "lastUpdateAt":timestamp,
        }
    )
}