// import React from 'react'
// import './test.css'

// function AllTest() {
//   return (
//     <div className='all-tests'>
//         <table>
//             <tr>
//                 <th>Title</th>
//                 <th>PassCode</th>
//                 <th>Start Time</th>
//             </tr>
//             <tr>
//                 <td>Quiz 1</td>
//                 <td>Germany</td>
//                 <td>10:10:10:10:10</td>
//             </tr>
//             <tr>
//                 <td>Quiz 2</td>
//                 <td>Mexico</td>
//                 <td>10:10:10:10:10</td>
//             </tr>
//         </table>
//     </div>
//   )
// }

// export default AllTest

import React, { useEffect, useState } from 'react'
import './test.css';
import { handleSort, renderPagiation } from '../../../data/data';
import { changeDateTime } from '../../../data/data';
import { usePagination } from '../../../hooks/teacher';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import { getAllTestAPI } from '../../../services/teacher';


const AllTest = (props: any) => {
    // set pagination
    const navigate = useNavigate();
    const itemsPerPage = 8;
    const [data, setData] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleGetAllTests = async () => {
        const res = await getAllTestAPI(props.classId)
        setData(res.data)
    }

    const { currentPage, totalPages, currentData, handlePageChange, setCurrentPage } = usePagination(itemsPerPage, data);

    useEffect(() => {
        handleGetAllTests();
    }, [props.test])

    return (
        <div className='mt-2'>
            <div className='tableAllTest'>
                <div className="table-header">
                    {props.titleData.map((item: string, index: number) => {
                        if (item !== 'id') {
                            if (index === 0) {
                                return (
                                    <div className="cell-header" key={index} style={{ flex: 1.5 }}
                                        onClick={() => handleSort(item, sortBy, setSortBy, sortOrder, setSortOrder, data, setData)}>
                                        {item} {sortBy === item && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="cell-header" key={index}
                                        onClick={() => handleSort(item, sortBy, setSortBy, sortOrder, setSortOrder, data, setData)}>
                                        {item} {sortBy === item && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </div>
                                )
                            }

                        }
                    })}
                </div>
                <div className="table-body">
                    {currentData.map((item, index) => {
                        return (
                            <div className="table-row" key={index} onClick={() => {
                                props.setTest(item)
                                props.setDataUpdate(item);
                            }}>
                                <div className="cell" style={{ flex: 1.5 }}>{item.title}</div>
                                <div className="cell">{changeDateTime(item.startTime)}</div>
                                <div className="cell">{item.passCode}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='d-flex mt-3 justify-content-center'>
                {currentData.length !== 0 && (
                    <Pagination>
                        <Pagination.First onClick={() => setCurrentPage(1)} />
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
                    </Pagination>
                )}

            </div>
        </div>
    )
}

export default AllTest

