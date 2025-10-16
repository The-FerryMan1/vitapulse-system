export const SSEConnection = async (url: string, id: number | string, filter?:string) => {
    let data = null;
    const eventSource = new EventSource(`${url}/${id}?filter=${filter}`,
    );

    eventSource.addEventListener('table-update', (e) => {
        data = JSON.parse(e.data);
    })
 
    return data
}