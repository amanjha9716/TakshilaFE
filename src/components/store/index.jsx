import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemStr = localStorage.getItem("userData");
                if (itemStr) {
                    const item = JSON.parse(itemStr);
                    const user = JSON.parse(item.value);
                    const response = await fetch(`https://www.takshilabackend.somee.com/api/Results/getallresult?username=${user.username}`);
                    if (response.ok) {
                        const fetchedData = await response.json();
                        setData(fetchedData);
                    } else {
                        console.error('Failed to fetch data');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
