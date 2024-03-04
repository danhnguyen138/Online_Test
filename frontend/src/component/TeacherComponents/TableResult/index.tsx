import React, { useState } from 'react'
import './tableResult.css';
import { handleSort } from '../../../data/data';
import { changeDateTime } from '../../../data/data';
import { usePagination } from '../../../hooks/teacher';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
export const TableResult = (props: any) => {
  // set pagination
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [data, setData] = useState(props.dataResult);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchInput, setSearchInput] = useState('');
  const handleSearch = (input: string) => {
    setSearchInput(input);
    const filteredData = props.dataResult.filter((item: any) =>
      item.title.toLowerCase().includes(input.toLowerCase())
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
          {props.titleData.map((item: string, index: number) => {
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
              <div className="table-row" key={index} onClick={() => navigate(`./${item.id}`)}>
                <div className="cell" style={{ flex: 1 }}>{item.title}</div>
                <div className="cell">{changeDateTime(item.startTime)}</div>
                <div className="cell">{item.passCode}</div>

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
