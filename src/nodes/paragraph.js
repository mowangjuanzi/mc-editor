const Paragraph = props => {
    const {attributes, children, element, editor} = props
    return <p className='ini_txt' {...attributes}>{children}</p>
}

export default Paragraph;