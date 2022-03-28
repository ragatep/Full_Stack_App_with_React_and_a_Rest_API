import React, { useEffect, useState } from "react";

const UpdateCourse = ({ context, history, match }) => {

    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
    });
    const [errors, setErrors] = useState({validationErrors: []});
    const { title, description, estimatedTime, materialsNeeded } = course
    const { password, user } = context.authenticatedUser; // Destructures to get the user's password.
    const courseId = Number(match.params.id.slice(1)); // Course Id.

    useEffect(() => {
        context.data
        .getCourse(courseId)
        .then((course) => {
          if (course) {
            setCourse(course); 
            if (user.id !== course.userId) {
                /**
                 * Redirects users if
                 * the requested course isn't owned by the validated authenticated user.
                 */  
                history.push('/forbidden');
            }
          } else {
            history.push("/notfound");
          }
        })
        .catch((error) => {
          if (error) {
            history.push("/error");
          }
        });
      }, [context.data, user.id, history, course.userId, courseId]);

      const updateCourseProp = (e) => {
        setCourse(prev => ({...prev,[e.target.name]: e.target.value}))
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();
        // Updates a course with the course's Id, properties, user authentication info.
        context.data.updateCourse(courseId, course, user.emailAddress, password) 
        .then((errors) => {
            if (errors.length) {
                setErrors({
                    validationErrors: errors,
                }); 
            } else {
                history.push(`/courses/:${courseId}`)
                console.log('Course Updated Successfully!')
            } 
          })
            .catch(error => {
                console.log(error);
            }) 
    }

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            {
                errors.validationErrors.length > 0
                ? 
                <div className="validation--errors">
                    <h3>Validation Error</h3>
                    <ul>
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
                        <input type="text" id='title' name='title' onChange={updateCourseProp} value={title} />
                        <label htmlFor="description">Course Description</label>
                        <textarea id='description' name='description' onChange={updateCourseProp} value={description} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id="estimatedTime" name='estimatedTime' onChange={updateCourseProp} value={estimatedTime} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name='materialsNeeded' onChange={updateCourseProp} value={materialsNeeded} />
                    </div>
                </div>
                <button className="button" type='submit'>Update Course</button>
                <a href={`/courses/:${courseId}`} className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default UpdateCourse;