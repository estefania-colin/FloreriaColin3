import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";

import { useOutsideClick, useEscPress, useFocusTrap, shareRef } from "./hooks";

const DATA = [
    { label: "Foo", value: "foo" },
    { label: "Bar", value: "bar" },
    { label: "Ding", value: "ding" },
    { label: "Dong", value: "dong" }
];

function MenuContent(props) {
    return (
        <div
            style={{
                backgroundColor: "hotpink",
                padding: 10,
                position: "absolute"
            }}
            {...props}
        />
    );
}

function MenuItem(props) {
    const { selected, ...otherProps } = props;
    return (
        <button
            style={{
                display: "block",
                position: "relative",
                backgroundColor: selected ? "lightgreen" : "lightgray"
            }}
            {...otherProps}
        />
    );
}

function Menu(props) {
    const [isOpen, setOpen] = React.useState(false);
    const containerRef = useOutsideClick(() => setOpen(false), isOpen);
    const trapRef = useFocusTrap(isOpen);
    useEscPress(() => setOpen(false), isOpen);

    return (
        <div ref={shareRef(containerRef, trapRef)}>
            <button
                onClick={() => {
                    setOpen(open => !open);
                }}
            >
                Menu {props.selected.label}
            </button>

            {isOpen && (
                <MenuContent>
                    {props.items.map(item => (
                        <MenuItem
                            key={item.value}
                            selected={props.selected.value === item.value}
                            onClick={() => {
                                props.onSelect(item);
                                setOpen(false);
                            }}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </MenuContent>
            )}
        </div>
    );
}

function App() {
    const [selected, selectItem] = React.useState(DATA[0]);

    return (
        <div className="App">
            <Menu selected={selected} onSelect={selectItem} items={DATA} />

            <pre>selected: {JSON.stringify(selected)}</pre>
            <a href="#">linkki</a>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
