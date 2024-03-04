import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

type TestParams = {
  classId: string;
};

type TestData = {
  id: string;
  title: string;
  period: number;
  startTime: any;
  endTime: any;
  passCode: string;
  classId: string;
};

export const useFetchData = (url: string, params: TestParams) => {
  const [data, setData] = useState<TestData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(url, { params });
      const data = response.data.data as TestData[];
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData };
}; 

export const usePagination = (itemsPerPage: number, items: any[]) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentData = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return { currentPage, totalPages, currentData, handlePageChange, setCurrentPage };
};

export const useModal = async () => {};
