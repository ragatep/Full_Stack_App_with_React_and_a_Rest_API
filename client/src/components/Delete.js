import React, { useEffect, useState } from "react";

const DeleteCourse = ({context, history, match}) => {
    const { password, user } = context.authenticatedUser;
    const courseId = Number(match.params.id.slice(1));
    const [course, setCourse] = useState([]);

    useEffect(() => {
        context.data
        .getCourse(courseId)
        .then((course) => {
          if (course) {
            setCourse(course);

            if (user.id !== course.userId) {
                history.push("/forbidden");
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleDelete = (e) => {

            context.data.deleteCourse(courseId, user.emailAddress, password);
                history.push("/");
      }

    return (
        <div className="wrap">
            <h2>Are you sure you want to delete this Course?</h2>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <form onSubmit={handleDelete}>
                <button className="button" type='submit'>Delete Course</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default DeleteCourse;