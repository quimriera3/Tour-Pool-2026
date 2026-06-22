"use client";
// components/RichTextEditor.js
//
// Minimal formatting toolbar (bold, italic, bullet list, brand colors) over
// a contentEditable area. The output is real HTML (e.g. "<b>...</b>"), which
// gets sent straight into the email body -- no markdown, no conversion step.
//
// Deliberately uncontrolled after mount: we set the initial HTML once and
// never feed state back into the DOM on every keystroke, which is what
// causes the cursor to jump to the start with contentEditable + React. To
// clear/reset the editor from outside, change the `resetKey` prop -- that
// remounts this component fresh.
import { useEffect, useRef } from "react";

export default function RichTextEditor({ initialValue, onChange, placeholder }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = initialValue || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function exec(command, arg) {
    ref.current.focus();
    document.execCommand(command, false, arg);
    onChange(ref.current.innerHTML);
  }

  return (
    <div>
      <div className="richtext-toolbar">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("bold")} title="Bold">
          <strong>B</strong>
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("italic")} title="Italic">
          <em>I</em>
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertUnorderedList")} title="Bullet list">
          • List
        </button>
        <span className="richtext-divider" />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("foreColor", "#111111")}
          title="Black text"
          style={{ color: "#111111" }}
        >
          ● Black
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("foreColor", "#ffd400")}
          title="Yellow text"
          style={{ color: "#ffd400", textShadow: "0 0 1px #00000055" }}
        >
          ● Yellow
        </button>
      </div>
      <div
        ref={ref}
        className="richtext-area"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        data-placeholder={placeholder}
      />
    </div>
  );
}
