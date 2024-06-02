import { BsWifiOff } from "react-icons/bs";
import { TbRobotOff, TbError404 } from "react-icons/tb";
import { FaLock } from "react-icons/fa";

const ERRORS = {
    NETWORK: 'network',
    SERVER: 'server',
    NOT_FOUND: 'not_found',
    AUTH: 'auth'
};

Object.freeze(ERRORS);

export default ERRORS;

function ErrorIcon({errorName}) {
    switch(errorName) {
        case ERRORS.SERVER:
            return <TbRobotOff size={125}/>;
        case ERRORS.NETWORK:
            return <BsWifiOff size={125}/>;
        case ERRORS.NOT_FOUND:
            return <TbError404 size={100}/>;
        case ERRORS.AUTH:
            return <FaLock size={100}/> 
        default:
            return <></>;
    }
}

export function ErrorFetch({errors, children, className}) {
    
    if (errors && errors.name) {
        return (
            <div className={
                    className ||
                    `absolute top-0 left-0 w-screen h-screen z-[10] 
                        flex items-center justify-center text-lg md:text-[2rem] 
                        bg-gradient-to-br from-gray-300`
                    }>
                <ErrorIcon errorName={errors.name} />
                <span className="pl-2">{errors.message}</span> 
            </div>
        );
    } else {
        return children;
    }
}