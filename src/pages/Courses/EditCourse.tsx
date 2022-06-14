import {observer} from "mobx-react-lite";
import {FC, useEffect} from "react";
import CourseForm from "../../components/CourseForm/CourseForm";
import {coursesService} from "../../services/courses.service";
import {useNavigate, useParams} from "react-router-dom";


const EditCourse: FC = observer(() => {
    const {course} = coursesService
    const {courseId = ''} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        if (courseId) {
            coursesService.getCourse(Number(courseId)).catch(console.log)
        }
    }, [courseId])
    const handleSubmit = (values: any) => coursesService.updateCourse(values)
        .then((id) => id ? navigate(`/course/${id}`) : null)
        .catch(console.log)
    return (<CourseForm title={'Редактировать направления'} data={course} onSave={handleSubmit}/>)
})
export default EditCourse
