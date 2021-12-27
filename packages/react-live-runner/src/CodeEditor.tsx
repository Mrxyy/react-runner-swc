import React, {
  useCallback,
  useState,
  useRef,
  ComponentPropsWithoutRef,
  useMemo,
} from 'react'
import Editor from 'react-simple-code-editor'

import { CodeBlock } from './CodeBlock'
import { Language, Theme } from './types'
import defaultTheme from './defaultTheme'

type EditorProps = ComponentPropsWithoutRef<typeof Editor>

export type CodeEditorProps = Omit<
  EditorProps,
  'defaultValue' | 'value' | 'onValueChange' | 'highlight' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  language?: Language
  padding?: number
  theme?: Theme
  onChange?: (value: string) => void
}

export const CodeEditor = ({
  defaultValue,
  value,
  language = 'jsx',
  theme = defaultTheme,
  padding = 10,
  onChange,
  ...rest
}: CodeEditorProps) => {
  const [code, setCode] = useState(defaultValue || '')

  const highlightCode = useCallback(
    (code: string) => (
      <CodeBlock language={language} theme={theme} noWrapper>
        {code}
      </CodeBlock>
    ),
    [language, theme]
  )

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const handleChange = useCallback(
    (code: string) => {
      if (value === undefined) setCode(code)
      onChangeRef.current?.(code)
    },
    [value]
  )
  const style = useMemo(
    () => ({ ...theme.plain, ...rest.style }),
    [theme.plain, rest.style]
  )

  return (
    <Editor
      {...rest}
      padding={padding}
      value={value !== undefined ? value : code}
      highlight={highlightCode}
      onValueChange={handleChange}
      style={style}
    />
  )
}