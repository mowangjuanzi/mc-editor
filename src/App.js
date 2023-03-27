import {useCallback, useState} from "react";
import {createEditor} from "slate";
import {Editable, Slate, withReact} from "slate-react";
import './App.css';

/**
 * 初始化数据
 */
const initValue = [
    {
        type: "heading-first",
        children: [{text: "返“璞”归真，回到法餐的原点"}]
    },
    {
        type: "heading-second",
        children: [{text: "这里是二级标题"}]
    },
    {
        type: "leading",
        children: [{text: "返“璞”归真，回到法餐的原点。"}],
    },
    {
        type: "emphasize",
        children: [{text: "这里是强调，这里是强调"}]
    },
    {
        type: "paragraph",
        children: [{ text: '位于上海静安区的璞麗酒店，常常被赞是“都会桃源”。远远看去波澜壮阔的建筑体，入口却并不明显。葱茏笔挺的翠竹临着喧嚣的街道，从这条小道进入，要拐过几个弯才能看到大门沉稳地立在眼前。哪怕去过几次，也会让人隐隐怀疑：咦，是不是在这里？' }],
    },
    {
        type: "image",
        children: [{text: "位于城市中心的璞麗酒店"}],
        link: 'https://img.mingchu.co/ueditor/php/upload/image/20230312/640d41003ff2b.jpeg'
    },
];

/**
 * 默认元素
 */
const DefaultElement = props => {
    return <p className='paragraph' {...props.attributes}>{props.children}</p>
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

/**
 * 打印 json 结构
 */
const SaveContent = value => {
    console.log(JSON.stringify(value));
}

function App() {

    // 实例化编辑器
    const [editor] = useState(() => withReact(createEditor()))

    // 渲染元素
    const renderElement = useCallback(props => {
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
    }, [])

    return (
        <Slate editor={editor} value={initValue} onChange={SaveContent}>
            <Editable className="editor-content"
                renderElement={renderElement}
            />
        </Slate>
    );
}

export default App;
