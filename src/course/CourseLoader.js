import axios from "axios";
import { loremIpsum } from "react-lorem-ipsum";

export async function courseLoader({ params }) {
    return courseDummyData(params.id);
}

export async function batchCourseLoader({ page, page_size }) {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("page_size", String(page_size));
    const courseBeUrl = `${process.env.REACT_APP_COURSE_BE}/course/list?${params}`;
    try {
        const result = await axios.get(
            courseBeUrl
        );
        return result.data;
    }
    catch(error) {
        return [];
    }
}

export function courseDummyData(id) {
    const dateNow = new Date();
    let timestamp = `
        ${dateNow.getUTCFullYear()}-${dateNow.getUTCMonth()}-${dateNow.getUTCDay()} 
        ${dateNow.getUTCHours()}-${dateNow.getUTCMinutes()}-${dateNow.getUTCSeconds()}`
    return (
        {
            "id":id,
            "title":loremIpsum().join(" ").substring(0, 500),
            "description":loremIpsum({p:4}).join(" "),
            "price":120.99,
            "creator":loremIpsum().join(" ").substring(0, 50),
            "picture_url":"https://res.cloudinary.com/dwlvcqj0u/image/upload/v1696150547/cld-sample-5.jpg",
            "createdAt":timestamp,
            "lastUpdateAt":timestamp,
        }
    )
}