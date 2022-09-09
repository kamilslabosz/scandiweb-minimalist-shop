import React from 'react';
import { useQuery, gql } from '@apollo/client';


class MainPage extends React.Component{
render(){
    return <div className='cat-main'>
        <h1 className='cat-name'>Category Name</h1>
    </div>
    }
}

export default MainPage;