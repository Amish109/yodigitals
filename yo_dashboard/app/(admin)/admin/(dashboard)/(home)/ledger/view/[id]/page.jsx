import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams()
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
        const fetchData = async (id) => {
            try {
             
              const token = localStorage.getItem('token');
                const response = await fetch(`https://b2b.yodigitals.com/api/users/${params?.id}`,{
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserData(data);
                console.log(data, "Fetched data");
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };
  
        fetchData();
    }, []); 
  
  const address = userData?.baddress;
  const topheadr = address?.split('\n')[0];
  
    
    useEffect(() => {
      if (id) {
        fetchTransactions(id);
      }
    }, [id]);
  
    useEffect(() => {
      filterTransactions();
    }, [transactions, filterType, selectedDate]);
  
    const filterTransactions = () => {
      let filteredData = transactions;
  
      if (filterType === 'credit' || filterType === 'debit') {
        filteredData = filteredData.filter(transaction => transaction.transaction_type === filterType);
      }
  
      if (selectedDate) {
        filteredData = filteredData.filter(transaction => new Date(transaction.createdAt).toISOString().split('T')[0] === selectedDate);
      }
  
      setFilteredTransactions(filteredData);
    };
  
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`https://b2b.yodigitals.com/api/transactions/user/${params?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const transactionsData = await response.json();
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
  
    const totalBalance = Array.isArray(filteredTransactions)
      ? filteredTransactions.reduce((sum, user) => {
        const balance = parseFloat(user.amount) || 0;
        return sum + balance;
      }, 0)
      : 0;
  
    const openBalance = Array.isArray(filteredTransactions)
      ? filteredTransactions.reduce((sum, user) => {
        const balance = parseFloat(user.opening_balance) || 0;
        return sum + balance;
      }, 0)
      : 0;
  
    const closeBalance = Array.isArray(filteredTransactions)
      ? filteredTransactions.reduce((sum, user) => {
        const balance = parseFloat(user.closing_balance) || 0;
        return sum + balance;
      }, 0)
      : 0;
      const TotalAmt = Array.isArray(filteredTransactions)
      ? filteredTransactions.reduce((sum, user) => {
        const balance = parseFloat(user.amount) || 0;
        return sum + balance;
      }, 0)
      : 0;
  
    const totalOpenClose = openBalance + closeBalance



  return (
    <div>page</div>
  ) 
}

export default page