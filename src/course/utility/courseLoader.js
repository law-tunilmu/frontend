import axios from "axios";
import ERRORS from "../components/ErrorPages";

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
        let name = ERRORS.NETWORK;
        let message = "Network error. Please check your internet connection";
        if (error.response) {
            name = ERRORS.SERVER;
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
        let name = ERRORS.NETWORK;
        let message = "Network Error. Please check your internet connection";
        if (error.response) {
            if (error.response.status === 404) {
                name = ERRORS.NOT_FOUND;
                message = "Course is not found";
            } else {
                name = ERRORS.SERVER;
                message = "Server Error. Please try again later";
            }
        }
        throw {
            name: name,
            message: message
        }
    }
}
