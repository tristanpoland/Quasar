// components/ModernIDE/Editor.jsx
import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { autocompletion } from '@codemirror/autocomplete';
import { lintGutter } from '@codemirror/lint';
import { oneDark } from '@codemirror/theme-one-dark';

const languageMap = {
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  python: python(),
  rust: rust(),
  cpp: cpp(),
  java: java(),
  html: html(),
  css: css(),
  json: json(),
  markdown: markdown(),
  sql: sql(),
  xml: xml(),
};

export const Editor = ({ content, language, onChange }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const languageSupport = languageMap[language] || javascript();

    const state = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        languageSupport,
        autocompletion(),
        lintGutter(),
        oneDark,
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto' },
          '.cm-content': { fontFamily: 'JetBrains Mono, monospace' },
        }),
      ]
    });

    const view = new EditorView({
      state,
      parent: editorRef.current
    });

    viewRef.current = view;

    return () => view.destroy();
  }, [language]);

  useEffect(() => {
    if (viewRef.current && content !== viewRef.current.state.doc.toString()) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: content
        }
      });
    }
  }, [content]);

  return <div ref={editorRef} className="h-full w-full" />;
};