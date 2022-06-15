import {observer} from "mobx-react-lite";
import {FC} from "react";
import CourseForm from "../../components/CourseForm/CourseForm";
import {coursesService} from "../../services/courses.service";
import {useNavigate, useParams} from "react-router-dom";

const CreateCourse: FC = observer(() => {
    const {departmentId = ''} = useParams()
    const navigate = useNavigate()
    const handleSubmit = (values: any) => coursesService.createCourse(values)
        .then((courseId) => courseId ? navigate(`/course/${courseId}`) : null)
        .catch(console.log)
    return (<CourseForm title={'Создание направления'} onSave={handleSubmit} departmentId={Number(departmentId)}/>)
})
export default CreateCourse
