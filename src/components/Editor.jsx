import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import { useEditor } from '@app/state/editor.js';

const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`hover:bg-gray-100 h-10 px-2 text-sm font-semibold uppercase border-r border-gray-300 ${className}`}
  >
    {children}
  </button>
);

export const Editor = () => {
  const {
    value,
    isValid,
    setNavigation,
    setValue,
    prettify,
    minify,
  } = useEditor();

  const onChangeEditor = (editor) => setValue(editor.getValue());
  const onChangeNavigation = (event) => setNavigation(event.target.value);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
      <div className="flex w-full border-b border-gray-300">
        <Button onClick={prettify}>Prettify</Button>
        <Button onClick={minify}>Minify</Button>
        <Button>Copy</Button>
        <Button>Share</Button>
        <Button disabled>Full screen</Button>
        <div className="flex-grow w-auto"></div>
        {isValid ? (
          <i className="flex items-center h-10 px-2 text-green-500 fa fa-check"></i>
        ) : (
          <i
            title="JSON payload is not valid"
            className="flex items-center h-10 px-2 text-red-500 fa fa-times"
          ></i>
        )}
      </div>
      <CodeMirror
        value={value}
        options={{
          lineNumbers: true,
          keyMap: 'sublime',
          matchBrackets: true,
          autoCloseBrackets: true,
          mode: 'application/json',
        }}
        height="60vh"
        onChange={onChangeEditor}
      />
      <div className="flex items-center justify-between h-10 border-t border-gray-300">
        <input
          placeholder="$.navigate[]"
          type="search"
          onChange={onChangeNavigation}
          className="w-full px-2 font-mono rounded-b-lg focus:outline-none"
        />
      </div>
    </div>
  );
};
