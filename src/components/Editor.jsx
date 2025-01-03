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

const chalky = "#e5c07b"
const coral = "#ff5252"
const cyan = "#56b6c2"
const invalid = "#ffffff"
const ivory = "#abb2bf"
const stone = "#7d8799"
const malibu = "#61afef"
const sage = "#98c379"
const whiskey = "#d19a66"
const violet = "#c678dd"
const darkBackground = "#000000"
const highlightBackground = "#15151f"
const background = "#000000"
const tooltipBackground = "#15151f"
const selection = "#28284e"
const cursor = "#528bff"

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
          '&': {
            height: '100%',
            overflow: 'scroll',
            color: ivory,
            backgroundColor: background,
          },
        
          '.cm-content': {
            fontFamily: 'JetBrains Mono, monospace',
            caretColor: cursor,
          },
        
          '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
          '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: selection,
          },
        
          '.cm-panels': { backgroundColor: darkBackground, color: ivory },
          '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
          '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
        
          '.cm-searchMatch': {
            backgroundColor: '#72a1ff59',
            outline: '1px solid #457dff',
          },
          '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: '#6199ff2f',
          },
        
          '.cm-activeLine': { backgroundColor: highlightBackground },
          '.cm-selectionMatch': { backgroundColor: '#aafe661a' },
        
          '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#bad0f847',
          },
        
          '.cm-gutters': {
            backgroundColor: background,
            color: stone,
            border: 'none',
          },
        
          '.cm-activeLineGutter': {
            backgroundColor: highlightBackground,
          },
        
          '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#ddd',
          },
        
          '.cm-tooltip': {
            border: 'none',
            backgroundColor: tooltipBackground,
          },
          '.cm-tooltip .cm-tooltip-arrow:before': {
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
          },
          '.cm-tooltip .cm-tooltip-arrow:after': {
            borderTopColor: tooltipBackground,
            borderBottomColor: tooltipBackground,
          },
          '.cm-tooltip-autocomplete': {
            '& > ul > li[aria-selected]': {
              backgroundColor: highlightBackground,
              color: ivory,
            },
          },
        }, { dark: true })
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