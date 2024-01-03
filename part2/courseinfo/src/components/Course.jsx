import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map((course)=>{
                return (
                    <div key={course.id}>
                        <Header text={course.name} />
                        <Content content={course.parts} />
                    </div>
                )
            })}
        </div>
    )
}

export default Course