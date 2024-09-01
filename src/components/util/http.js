export async function fetchData(query){
    const res=await fetch(url);
    if(!res.ok)
    {
        const error=new Error('An error occured while loading the data');
        error.code=res.status;
        error.info=await res.json();
        throw error; 
    }
    const {data} = await res.json();
    return data;
}