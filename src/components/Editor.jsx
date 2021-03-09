import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import { isEmpty } from '@app/lib/isEmpty.js';
import { useEditor } from '@app/state/editor.js';

const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`hover:bg-gray-100 disabled:opacity-50 h-10 px-2 text-sm font-semibold uppercase border-r border-gray-300 ${className}`}
  >
    {children}
  </button>
);

export const Editor = () => {
  const editorRef = React.useRef();

  const {
    value,
    navigationValue,
    navigation,
    isValid,
    setNavigation,
    setValue,
    prettify,
    minify,
  } = useEditor();

  React.useEffect(() => {
    const {
      current: { editor },
    } = editorRef;

    isEmpty(navigation)
      ? editor?.setOption('readOnly', false)
      : editor?.setOption('readOnly', 'nocursor');
  }, [navigation]);

  const onChangeEditor = (editor) => {
    setValue(editor.getValue());
  };

  const onChangeNavigation = (event) => {
    setNavigation(event.target.value);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="flex w-full border-b border-gray-300">
        <Button onClick={prettify}>Prettify</Button>
        <Button onClick={minify}>Minify</Button>
        <Button disabled>Copy</Button>
        <Button disabled>Share</Button>
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
        ref={editorRef}
        value={navigation.trim().length > 0 ? navigationValue : value}
        options={{
          lineNumbers: false,
          keyMap: 'sublime',
          matchBrackets: true,
          autoCloseBrackets: true,
          mode: 'application/json',
        }}
        height="60vh"
        onChange={(editor) => onChangeEditor(editor)}
      />

      <div
        className={`flex items-center justify-between h-10 border-t border-gray-300`}
      >
        <input
          type="search"
          placeholder="$.navigate[]"
          spellCheck={false}
          readOnly={!isValid}
          value={navigation}
          onChange={onChangeNavigation}
          className="w-full px-2 font-mono bg-transparent rounded-b-lg focus:outline-none"
        />
      </div>
    </div>
  );
};
