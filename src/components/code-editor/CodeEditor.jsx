/* eslint-disable no-unused-vars */
import React from 'react'
import MonacoEditor from 'react-monaco-editor'

const CodeEditor = ({ language, theme, value, onChange }) => {
    const editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor)
        editor.focus()
    }

    const options = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
    }

    return (
        <MonacoEditor
            language={language}
            theme={theme}
            value={value}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
        />
    )
}

export default CodeEditor
