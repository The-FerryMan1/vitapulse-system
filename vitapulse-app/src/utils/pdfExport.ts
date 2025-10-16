import { useAxios } from '@/axios/useAxios';
import type{TableDate,User} from '@/types/types'
import jsPDF from 'jspdf';
import { getTheAge } from './getTheAge';
export const summaryhealtReport = async(filter:string, userid: number | string)=>{
    const pdf = new jsPDF()
    let usersData: TableDate[]=[];
    let user:User;
    try {
        const { data: userInfo } = await useAxios.get(`/auth/user/${userid}`);
        user = userInfo;

        const { data } = await useAxios.get(`/auth/bp/summary/${userid}?filter=${filter}`);
        usersData = data
    
        if (!usersData || usersData.length < 0 ) return null
        // Title
        pdf.setFontSize(20);
        pdf.text('Health Summary Report', 20, 20);
        const total = usersData.reduce((acc, curr)=>{
            acc.systolic += curr.systolic;
            acc.diastolic += curr.diastolic;
            return acc
        }, {systolic: 0, diastolic:0})

        const avgSys = (total.systolic / usersData.length).toFixed(0)
        const avgDias = (total.diastolic / usersData.length).toFixed(0)

        const pulseTotal = usersData.reduce((acc, curr)=>{
            acc.pulse += curr.pulse;
            return acc
        }, {pulse: 0})

        const avgPulse = (pulseTotal.pulse/usersData.length).toFixed(0)

        const highestBpReading = usersData.reduce((max, curr) => {
            if (curr.systolic > max.systolic) return curr;
            if (curr.systolic === max.systolic && curr.diastolic > max.diastolic) return curr;
            return max;
        });

        const lowestBpReading = usersData.reduce((min, curr) => {
            if (curr.systolic < min.systolic) return curr;
            if (curr.systolic === min.systolic && curr.diastolic < min.diastolic) return curr;
            return min;
        });

        const highestPulse = usersData.reduce((max, curr)=>{
            return curr.pulse >max.pulse ?curr : max
        })
        const lowestPulse= usersData.reduce((low, curr)=>{
            return curr.pulse <low.pulse ?curr : low
        })

        const timestamps: Date[] = usersData
            .map((entry: { timestamp: string }) => new Date(entry.timestamp))
            .sort((a: Date, b: Date) => a.getTime() - b.getTime()); // Use .getTime() for safe comparison

        const fromDate: Date = timestamps[0];
        const toDate: Date = timestamps[timestamps.length - 1];

        const formatDate = (date: Date): string =>
            date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
        const age = getTheAge(String(user?.birthday))

        // Personal Information
        pdf.setFontSize(14);
        pdf.text(`Name: ${user.name}`, 20, 40);
        pdf.text(`Age: ${age}`, 20, 50);
        pdf.text(`Gender: ${user.sex}`, 20, 60);
        pdf.text(`Report Period: ${formatDate(fromDate)} to ${formatDate(toDate) }`, 20, 70);
        pdf.text(`Generated on: ${new Date(Date.now()).toLocaleDateString()}`, 20, 80);

        // Health Metrics Table
        pdf.text('Metric | Value', 20, 100);
        pdf.text('-----------------------------------', 20, 110);

        pdf.text(`Average BP: ${avgSys}/${avgDias}`, 20, 120);
        pdf.text(`Average Pulse: ${avgPulse} bpm`, 20, 130);
        pdf.text(`Highest BP: ${highestBpReading.systolic} / ${highestBpReading.diastolic} on ${new Date(highestBpReading.timestamp).toLocaleString() }`, 20, 140);
        pdf.text(`Lowest BP: ${lowestBpReading.systolic} / ${lowestBpReading.diastolic} on ${new Date(lowestBpReading.timestamp).toLocaleString() }`, 20, 150);
        
        pdf.text(`Highest Pulse : ${highestPulse.pulse} bpm on ${new Date(highestPulse.timestamp).toLocaleDateString() }`, 20, 160);
        pdf.text(`Lowest Pulse : ${lowestPulse.pulse} bpm on ${new Date(lowestPulse.timestamp).toLocaleDateString() }`, 20, 170);
        pdf.text(`Days Monitored : from: ${formatDate(fromDate)} - to: ${formatDate(toDate)}`, 20, 180);

        await useAxios.post('/auth/user/logs', { activity:'Downloaded Weekly summary Health report' }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        pdf.save(`${user.name}_health_summary_report.pdf`);
        return true

    } catch (error) {
        console.log(error)
        return false
    }
}