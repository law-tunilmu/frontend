const USER_CONSTRAINTS = {
    USERNAME: {
        MAX_LEN: 100
    },
    ROLES: {
        STUDENT: 'STUDENT',
        MENTOR: 'MENTOR'
    }
}
Object.freeze(USER_CONSTRAINTS);

export default USER_CONSTRAINTS;