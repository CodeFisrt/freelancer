export const Constant = {
    API_METHOD_NAME: {
        USER: {
            GET_ALL_USERS: 'GetAllUsers',
            CREATE_USER: 'Register',
            UPDATE_USER: 'UpdateUser',
            LOGIN:'login',
            DELETE_USER: 'DeleteUserByUserId?userId='
        },
        JOB: {
            GET_ALL_JOBS: 'GetAllJobs',
            CREATE_NEW_JOB:'CreateNewProjectJob',
            GET_JOB_BY_ID:'GetJobById?id=',
            GET_ALL_JOBS_BY_USERID:'GetProjectsCreatedByUserId?userId=',
        },
        BID: {
            CREATE_NEW_BID: 'bids',
             
        }
    },
    KEY:{

    },
    VALIDATION_MESSAGE: {
        REQUIRED:'This Is Required',
        EMAIL: 'Emmail Id is Not proper'
    },
    STATUS:{
        NEW: 'nEW',
        SHIPPED:'SHIPPED'
    },
    REG_EX:{
        PAN_CARD:"",
        AADHAR_CARD: ""
    },
    lOCAL_STRORAGE_KEYS:{
        LOGGED_USER:'freeUser'
    }

}

