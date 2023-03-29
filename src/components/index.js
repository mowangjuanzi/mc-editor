import {PARAGRAPH} from '../utilities/schema'
import {Paragraph} from "../nodes";

const Element = (props) => {
    const {attributes, children, element, editor} = props
    const {type, data} = element;

    const baseElementRenderer = {
        [PARAGRAPH]: <Paragraph {...props} />
    }

    return (baseElementRenderer[type]);
}

export default Element;