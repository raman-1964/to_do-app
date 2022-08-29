import React from 'react';

function Items(props) {

    return (
        <>
            <div className="item">
                <p>{props.text}</p>
                <div className='btn_cont'>
                    <button onClick={() => {
                        props.onEdit(props.id)
                    }}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i> </button>
                    <button onClick={() => {
                        props.onDelete(props.id)
                    }}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
            </div>
        </>
    )
}

export default Items;

