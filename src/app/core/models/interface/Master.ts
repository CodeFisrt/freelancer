export interface IAPIResponce {
    message: string,
    result: true,
    data: any
}

export interface IJobListAPIResponce {
    success: true,
    data: any
}

export interface UserList {
    userId: number
    userName: string
    emailId: string
    fullName: string
    role: string
    createdDate: string
    password: string
    projectName: string
    refreshToken: any
    refreshTokenExpiryTime: any
}

export interface JobList{
    projectId: number,
    title: string,
    deadline: string ,
    skillsRequired: string,
    createdByUser: string,
    userId: number
} 