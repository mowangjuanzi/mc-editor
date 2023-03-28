/**
 * 段落
 */
const DefaultElement = props => {
    return <div>
        <div><p className='paragraph' {...props.attributes}>{props.children}</p></div>
    </div>
}

/**
 * 导语
 */
const LeadingElement = props => {
    return <p className="leading" {...props.attributes}>{props.children}</p>
}

/**
 * 图片
 */
const ImageElement = props => {
    return <figure className='image'>
        <img {...props.attributes} src={props.element.link} alt={props.element.children[0].text}/>
        <figcaption>{props.element.children[0].text}</figcaption>
    </figure>
}

/**
 * 一级标题
 */
const HeadingFirstElement = props => {
    return <h1 className='heading-first' {...props.attributes}>{props.children}</h1>
}

/**
 * 二级标题
 */
const HeadingSecondElement = props => {
    return <h2 className='heading-second' {...props.attributes}>{props.children}</h2>
}

/**
 * 我起名叫做强调，页面叫做高亮
 */
const EmphasizeElement = props => {
    return <p className='emphasize' {...props.attributes}>{props.children}</p>
}

export const renderElement = props => {
    switch (props.element.type) {
        case 'leading':
            return <LeadingElement {...props} />
        case "image":
            return <ImageElement {...props} />
        case "heading-first":
            return <HeadingFirstElement {...props} />
        case "heading-second":
            return <HeadingSecondElement {...props} />
        case "emphasize":
            return <EmphasizeElement {...props} />
        default:
            return <DefaultElement {...props} />
    }
}