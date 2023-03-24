import {useCallback, useState} from "react";
import {createEditor} from "slate";
import {Editable, Slate, withReact} from "slate-react";
import './App.css';

const initValue = [
    {
        type: "paragraph",
        children: [{ text: 'A line of text in a paragraph.' }],
    }
];

/**
 * 默认元素
 */
const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
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
        return <DefaultElement {...props} />
    }, [])

    return (
        <Slate editor={editor} value={initValue} onChange={SaveContent}>
            <Editable
                renderElement={renderElement}
            />
        </Slate>
    );
}

export default App;
