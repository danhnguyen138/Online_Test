import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Sidebar } from '../../component/TeacherComponents/Sidebar/Sidebar'
import { Dashboard } from './Test/Dashboard'
import { CreateTest } from './Test/CreateTest'
import { ResultTest } from './Result/ResultTest'
import { ResultTestDetail } from './Result/ResultTestDetail'
import ResultDetailList from './Result/ResultDetailList'
import ListQuestion from './Test/ListQuestion'

export default function TeacherPages() {
    return (
        <div className='d-flex justify-center'>
            <Sidebar />
            <div className='w-100 p-2 overflow-x-hidden'>
                <Routes>
                    <Route path='/' element={<Navigate to='./dashboard' />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/createTest' element={<CreateTest />} />
                    <Route path='/result' element={<ResultTest />} />
                    <Route path='/result/:testId/:submissionId' element = {<ResultDetailList/>}/>
                    <Route path='/result/:testId' element={<ResultTestDetail />}/>
                    <Route path='/dashboard/:testId' element = {<ListQuestion/>} />
                </Routes>
            </div>
        </div>
    )
}
