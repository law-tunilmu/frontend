export function userLoader() {
    return dummyUser();
}

function dummyUser() {
    return {
        "username": "test2",
        "email": "test2@email.com",
        "password": "$2a$10$H//S4vwky.P.I52Ob8jSce8c3oHVGRT4/nMwpvfWj3AsVTPb.0n3u",
        "role": "STUDENT",
        "accountNonExpired": true,
        "credentialsNonExpired": true,
        "accountNonLocked": true,
        "authorities": [],
        "enabled": true
    }
}