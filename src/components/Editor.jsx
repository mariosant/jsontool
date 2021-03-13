import jsonlint from 'jsonlint-mod';
window.jsonlint = jsonlint;
import * as React from 'react';
import copy from 'copy-to-clipboard';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/keymap/sublime.js';
import 'codemirror/theme/monokai.css';
import { isEmpty } from '@app/lib/isEmpty.js';
import { getKeys } from '@app/lib/getKeys';
import { useEditor } from '@app/state/editor.js';

const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`hover:bg-gray-100 disabled:opacity-50 h-10 px-2 text-sm font-semibold uppercase border-r border-gray-300 ${className}`}
  >
    {children}
  </button>
);

const SearchInput = ({ onSearch, ...props }) => {
  const { isValid, navigationValue } = useEditor();

  const [state, setState] = React.useState('');

  const onChange = (event) => {
    setState(event.target.value);

    if (event.target.value === '') {
      onSearch('');
    }
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      onSearch(state);
    }
  };

  return (
    <input
      type="search"
      onChange={onChange}
      onKeyUp={handleEnterKey}
      {...props}
    />
  );
};

export const Editor = () => {
  const editorRef = React.useRef();
  const [copyState, setCopy] = React.useState(false);

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

  const onCopy = () => {
    copy(value, {
      onCopy: () => {
        setCopy(true);
        setTimeout(() => setCopy(false), 3000);
      },
    });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="flex w-full border-b border-gray-300">
        <Button onClick={prettify}>Prettify</Button>
        <Button onClick={minify}>Minify</Button>
        <Button disabled={copyState} onClick={onCopy}>
          {copyState ? `Copied!` : `Copy`}
        </Button>
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
          mode: 'application/json',
          gutters: ['CodeMirror-lint-markers'],
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          lint: { esversion: '8' },
          autoCloseBrackets: true,
          matchBrackets: true,
          keyMap: 'sublime',
        }}
        height="60vh"
        onChange={(editor) => onChangeEditor(editor)}
      />

      <div
        className={`flex items-center justify-between h-10 border-t border-gray-300 relative`}
      >
        <SearchInput
          type="search"
          placeholder="$.navigate[]"
          spellCheck={false}
          readOnly={!isValid}
          onSearch={setNavigation}
          className="w-full px-2 font-mono bg-transparent rounded-b-lg focus:outline-none"
        />
      </div>
    </div>
  );
};
