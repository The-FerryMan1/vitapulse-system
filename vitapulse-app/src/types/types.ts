export interface User {
    id: number;
    role: string;
    name: string;
    email: string
    sex: string;
    birthday: number;
    contact: string;
    isVerified: boolean;
    status: boolean;
}

export interface bpPulse {
    systolic: number,
    diastolic: number,
    pulseRate: number,
    date: string
}
export interface TableDate {
    diastolic: number,
    clinicalBpLabel: string,
    diastolicZ: number,
    id: number,
    systolic: number,
    systolicZ: number
    bpStatus: string,
    pulseStatus: string,
    pulse: number,
    pulseZ: number,
    timestamp: string,

}

export interface alerts {
    id: number;
    user_id: number;
    message: string;
    isRead: boolean
    timestamp: string;
}

export interface UserLogs{
    id: number;
    user_id: number;
    activity: string;
    timestamp: string;
}

export interface Counts{
    alertCount: number;
    userCount?: number | undefined;
    statusCount?: number | undefined;
}

export interface Logins {
    id: number;
    date: string;
    logins: number;
}
export interface Abnormal{
    bpStatus: string;
    timestamp: string
}
