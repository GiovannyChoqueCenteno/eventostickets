import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useLoadEvent } from '../../../../hook/useLoadEvent'
import { CARD } from '../../../const/theme'
import List from './component/List'
import Search from './component/Search'

const HomePage = () => {

    const { eventoFilter, search, filterCategoria, getAllEvent } = useLoadEvent();

    useEffect(() => {
        getAllEvent()
    }, [])

    return (
        <Container className={'mt-4 p-4 text-dark'}>
            <h4 className=''>Eventos</h4>
            <hr />
            <Container className={'rounded shadow p-2'} style={{ backgroundColor: CARD }}>
                <Search search={search} filterCategoria={filterCategoria} />
                <hr />
                <List data={eventoFilter} />
            </Container>
        </Container>
    )
}

export default HomePage