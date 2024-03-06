import React from 'react';

const AddProject = () => {
    return (
        <div className='fixed-bottom p-4'>
            <div className='card-footer'>
                Featured
            </div>
            <div className='card-body'>
                <h5 className='card-title'>Here you can create a new project</h5>
                <p className='card-text'>It is not necessary to add description but you must add the project name</p>
                <a href='/create-project' className='btn btn-primary'>Add Project</a>
            </div>
        </div>
    )
}

export default AddProject;