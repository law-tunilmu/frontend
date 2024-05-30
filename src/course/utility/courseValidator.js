import CONSTANTS from "./courseConstants";

export function validateCourse (name, value) {
    let error = "";
    const titleName = name[0].toUpperCase() + name.substring(1);

    if (!value) {
        if (name !== "picture") {
            error = `Please enter ${titleName}.`
        }
    }
    else {
        switch (name) {    
            case "title":
                if (value.length > CONSTANTS.MAX_TITLE) {
                    error = `${titleName} must be less than ${CONSTANTS.MAX_TITLE} characters`;
                }
                break;
    
            case "description":
                if (value.length > CONSTANTS.MAX_DESC) {
                    error = `${titleName} must be less than ${CONSTANTS.MAX_DESC} characters`;
                }
                break;

            case "price":
                if (isNaN(parseFloat(value))) {
                    error = `${titleName} must be a valid number`;
                }
                else if(parseFloat(value) < 0) {
                    error = `${titleName} must NOT be negative`;
                }
                break;

            case "picture":
                const file = value;
                if (file && file.size > CONSTANTS.MAX_PIC_SIZE*1_000_000) {
                    error = `${titleName} is larger than ${CONSTANTS.MAX_PIC_SIZE}MB`;
                }
                else {
                    const parts = file.name.split(".");
                    const ext = parts[parts.length - 1].toLowerCase();
            
                    if (ext && !(CONSTANTS.PIC_EXTS.includes(ext))) {
                        error = "File is not a valid image format";   
                    }
                }
                break;

            default:
                break;
        }
    } 
    return error;
}