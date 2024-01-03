import Part from './Part'

const Content = ({ content }) => {
    const sum = content.reduce((sum, part) => { return sum += part.exercises }, 0)
    return (
        <div>
            {content.map((part) => {
                return <Part key={part.id} name={part.name} exercises={part.exercises} />
            })}
            <p><b>total of {sum} exercises</b></p>
        </div>
    )
}

export default Content