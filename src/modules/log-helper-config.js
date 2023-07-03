import 'dotenv/config'

/*
    0: error
    1: warn
    2: info
    3: VERSOBE
    4: debug
    5: silly
*/

const logConfiguration = {
    logFolder : process.env.LOG_ROOT_FOLDER
};
export default logConfiguration;