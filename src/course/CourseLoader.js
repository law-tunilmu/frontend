import axios from "axios";
import { loremIpsum } from "react-lorem-ipsum";

export async function courseLoader({ params }) {
    return courseDummyData(params.id);
}

export async function batchCourseLoader({ page, page_size, sortKey, isDescending=false }) {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("page_size", String(page_size));

    if (sortKey) {
        params.append("order_by", String(sortKey));
    }
    params.append("is_descending", String(isDescending));

    const courseBeUrl = `${process.env.REACT_APP_COURSE_BE}/course/list?${params}`;
    try {
        const result = await axios.get(
            courseBeUrl
        );
        return result.data;
    }
    catch(error) {
        let name = "fetcher";
        let message = "Network error. Please check your internet connection";
        if (error.response) {
            message = "Server error. Please try again later";
        }
        throw {
            name: name,
            message: message
        }
    }
}

export async function singleCourseLoader({courseId}) {
    const courseBeUrl = `${process.env.REACT_APP_COURSE_BE}/course/detail/${courseId}`;
    try {
        const result = await axios.get(
            courseBeUrl
        );
        return result.data;
    }
    catch(error) {
        let name = "network";
        let message = "Network Error. Please check your internet connection";
        if (error.response) {
            if (error.response.status === 404) {
                return null;
            } else {
                name = "server";
                message = "Server Error. Please try again later";
            }
        }
        throw {
            name: name,
            message: message
        }
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