import {useCallback, useState} from "react";
import {createEditor} from "slate";
import {Editable, Slate, withReact} from "slate-react";
import './app.css';
import Element from "./components";

const initValue = [
    {
        type: "paragraph",
        children: [{ text: 'A line of text in a paragraph.' }],
    }
];

function App() {

    // 实例化编辑器
    const [editor] = useState(() => withReact(createEditor()))

    // 渲染元素
    const renderElement = useCallback((slateProps) => {
        const elementProps = {...slateProps, editor}

        return (<Element {...elementProps} />);
    }, [editor])

    return (
        <Slate editor={editor} value={initValue}>

            <Editable className='editor-content'
                      renderElement={renderElement}
            />
        </Slate>
    );
}

export default App;
