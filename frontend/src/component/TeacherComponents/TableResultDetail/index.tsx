import React, { useState } from 'react';
import './style.css';
import { changeDateTime, handleSort } from '../../../data/data';
import { usePagination } from '../../../hooks/teacher';
import Pagination from 'react-bootstrap/Pagination';
import { IoLogoSteam } from 'react-icons/io5';
export const TableResultDetail = (props: any) => {
    const itemsPerPage = 8;
    const [data, setData] = useState(props.data);
    console.log(data);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchInput, setSearchInput] = useState('');
    const handleSearch = (input: string) => {
        setSearchInput(input);
        const filteredData = props.data.filter((item: any) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        )
        setData(filteredData)
    }
    const { currentPage, totalPages, currentData, handlePageChange, setCurrentPage } = usePagination(itemsPerPage, data);
    return (
        <div className='ml-3 mt-2 '>
            <div className='searchInput'>
                <input placeholder='Search' value={searchInput} onChange={(e) => handleSearch(e.target.value)} />
            </div>
            <div className='tableResult'>
                <div className="table-header">
                    {props.title.map((item: string, index: number) => {
                        if (item !== 'id') {
                            if (index === 0) {
                                return (
                                    <div className="cell-header" key={index}
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
                            <div className="table-row" key={index} onClick={
                                () => {
                                    props.setDataDetail({
                                        name: item.name,
                                        score: item.score,
                                        studentId: item.studentId,
                                        submissionId: item.submissionId,
                                        submissionTime: item.submissionTime,
                                        timeSpent: item.timeSpent,
                                        totalCorrect: item.totalCorrect,
                                        totalQuestionAttempt: item.totalQuestionAttempt,
                                        totalWrong: item.totalWrong
                                    })
                                    props.handleShow()
                                }
                            }
                            >
                                <div className="cell" style={{ flex: 1 }}>{item.name}</div>
                                <div className="cell">{item.score}</div>
                                <div className="cell">{changeDateTime(item.submissionTime)}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='d-flex mt-3 justify-content-center'>
                {currentData.length != 0 && (
                    <Pagination>
                        <Pagination.First onClick={() => setCurrentPage(1)} />
                        {Array.from({ length: totalPages }, (_, index) => {
                            return (
                                <Pagination.Item
                                    key={index}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            )
                        })}
                        <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
                    </Pagination>
                )}
            </div>
        </div>
    )
}
