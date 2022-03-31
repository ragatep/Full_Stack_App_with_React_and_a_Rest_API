import React, { useState } from "react";

const CreateCourse = ({ context, history }) => {
    /**
     * I initial wrote the UpdateCourse Component this way, 
     * but decided to use useRef instead.
     */
    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
    });
    const [errors, setErrors] = useState({validationErrors: []});
    const { title, description, estimatedTime, materialsNeeded } = course
    const { password, user } = context.authenticatedUser; // Destructures to get the user's password.
    /**
     * onChange, uses a functional update, and create a new state based on the previous state
     * before setting it using setCourse().
     * https://reactjs.org/docs/hooks-reference.html#functional-updates
     */
    const updateCourseProp = (e) => {
        setCourse(prevState => ({...prevState,[e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adds the authenticated user's user Id to course property.
        const courseProp = { title, description, estimatedTime, materialsNeeded, userId: user.id }; 
        // Creates a course with the course's properties and user authentication info.
        context.data.createCourse(courseProp, user.emailAddress, password) 
        .then((errors) => {
            if (errors.length) {
                setErrors({
                    validationErrors: errors,
                }); 
            } else {
              history.push("/");
            } 
        })
            .catch(error => {
                console.log(error);
            }) 
    }
    
    return (
        <div className="wrap">
            <h2>Create Course</h2>
            {
                errors.validationErrors.length > 0
                ? 
                <div className="validation--errors">
                    <h3>Validation Error</h3>
                    <ul>
                        {/** Maps through and shows a list of errors, if any. */}
                        {errors.validationErrors.map((error, i) => {
                            return <li key={i}>{error}</li>
                        })}
                    </ul>
                </div>
                :
                null
            }
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="title">Course Title</label>
                        <input 
                            id='title'
                            name='title'
                            type="text" 
                            value={title}  
                            onChange={updateCourseProp} 
                            placeholder="Title"
                            />
                        <label htmlFor="description">Course Description</label>
                        <textarea 
                            id='description' 
                            name='description' 
                            value={description}
                            onChange={updateCourseProp} 
                            placeholder="Course Description"
                            />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id="estimatedTime" name='estimatedTime' onChange={updateCourseProp} value={estimatedTime} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name='materialsNeeded' onChange={updateCourseProp} value={materialsNeeded} />
                    </div>
                </div>
                <button className="button" type='submit'>Create Course</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default CreateCourse;