import {useCallback, useState} from "react";
import {createEditor, Node, Transforms} from "slate";
import {Editable, Slate, withReact} from "slate-react";
import './App.css';
import {renderElement} from "./components/element";
import isHotkey from "is-hotkey";

/**
 * 初始化数据
 */
const initValue = [
    {
        type: "paragraph",
        children: [{text: ''}],
    },
    // {
    //     type: "heading-first",
    //     children: [{text: "返“璞”归真，回到法餐的原点"}]
    // },
    // {
    //     type: "heading-second",
    //     children: [{text: "这里是二级标题"}]
    // },
    // {
    //     type: "leading",
    //     children: [{text: "返“璞”归真，回到法餐的原点。"}],
    // },
    // {
    //     type: "emphasize",
    //     children: [{text: "这里是强调，这里是强调"}]
    // },
    {
        type: "paragraph",
        children: [{text: '位于上海静安区的璞麗酒店，常常被赞是“都会桃源”。远远看去波澜壮阔的建筑体，入口却并不明显。葱茏笔挺的翠竹临着喧嚣的街道，从这条小道进入，要拐过几个弯才能看到大门沉稳地立在眼前。哪怕去过几次，也会让人隐隐怀疑：咦，是不是在这里？'}],
    },
    {
        type: "image",
        children: [{text: "位于城市中心的璞麗酒店"}],
        link: 'https://img.mingchu.co/ueditor/php/upload/image/20230312/640d41003ff2b.jpeg'
    },
];

const selectElement = [
    {"label": "段落", "value": "paragraph",},
    {"label": "一级标题", "value": "heading-first",},
    {"label": "二级标题", "value": "heading-second",},
];

const RightSidebar = props => {

    const listItems = selectElement.map((item, key) =>
        <option key={item.value} value={item.value}>{item.label}</option>
    );

    const onChange = event => {
        props.setValue(event.target.value);

        console.log(event.target.value, props.editor);

        Transforms.setNodes(props.editor, {
            type: event.target.value,
        })
    }

    return <div className="right-sidebar">
        <select onChange={onChange} value={props.value}>
            {listItems}
        </select>
    </div>
}

const onKeyDown = (event) => {
    if (isHotkey("enter", event)) {

        // event.preventDefault()

    }
}

function App() {

    const [value, setValue] = useState("");

    // 实例化编辑器
    const [editor] = useState(() => withReact(createEditor()))

    /**
     * 打印 json 结构
     */
    const SaveContent = value => {
        console.log(JSON.stringify(value));

        // 设置样式
        setValue(Node.parent(editor, editor.selection.focus.path).type);
    }

    const insertImage = (event) => {
        editor.insertNode({
            type: "image",
            children: [{text: "位于城市中心的璞麗酒店"}],
            link: 'https://img.mingchu.co/ueditor/php/upload/image/20230312/640d41003ff2b.jpeg'
        })
    }

    // 渲染元素
    const renderElementCallback = useCallback(renderElement, [])

    return (
        <Slate editor={editor} value={initValue} onChange={SaveContent}>
            <button onClick={insertImage}>插入图片</button>
            <Editable className="editor-content"
                      renderElement={renderElementCallback}
                      onKeyDown={onKeyDown}
            />
            <RightSidebar editor={editor} value={value} setValue={setValue}/>
        </Slate>
    );
}

export default App;
