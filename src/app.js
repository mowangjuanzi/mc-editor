import {useState} from "react";
import {createEditor} from "slate";
import {Editable, Slate, withReact} from "slate-react";
import './app.css';

const initValue = [
    {
        type: "paragraph",
        children: [{ text: 'A line of text in a paragraph.' }],
    }
];

function App() {

    // 实例化编辑器
    const [editor] = useState(() => withReact(createEditor()))

    return (
        <Slate editor={editor} value={initValue}>
            <Editable />
        </Slate>
    );
}

export default App;
