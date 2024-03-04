import React, { useEffect, useState } from 'react'
import { TableResult } from '../../../component/TeacherComponents/TableResult'
import { dataResult1 } from '../../../data/data';
import { titleResult } from '../../../data/data';
import { getAllTestAPI } from '../../../services/teacher';
import { useParams } from 'react-router-dom';
export const ResultTest = () => {
    const {classId}= useParams();
    const [dataResult, setDataResult]= useState();
    useEffect(() => {
        const fetchData= async()=>{
            const res=  await getAllTestAPI(classId);
            setDataResult(res?.data);
        }
        fetchData();
    }, [])
    if (!dataResult) return null;
    console.log(dataResult)
    return (
        <>
            <div style={{ marginTop: "5px" }}>
                <h5 style={{
                    marginLeft: "20px",
                    fontWeight: "600",
                    color: "black"
                }}>RESULTS</h5>
            </div >
            <TableResult dataResult={dataResult} titleData={titleResult} />
        </>
    )
}
