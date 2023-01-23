import "./Loading.scss";
import React from 'react';
import ReactLoading from 'react-loading';

export const Loading = ({ fullwindow = false, type = 'cubes', color = '#fff' }) => (
    <div className="Loading">
    {
        fullwindow ?
        <div className='fullwindow-warper'>
            <ReactLoading type={type} color={color} />
        </div> :
        <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
    }
    </div>
);