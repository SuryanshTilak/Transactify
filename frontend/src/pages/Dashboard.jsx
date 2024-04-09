import React from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'


export function Dashboard(){

    return(<>
    <Appbar label="Transactify App" />
    <Balance />
    <Users label={"Users"} placeholder="Search Users.."/>
    </>)
}