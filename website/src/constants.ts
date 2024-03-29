import React from 'react'
import styled, { css, keyframes, createGlobalStyle } from 'styled-components'
import * as Styled from 'styled-components'
import { codeBlock } from 'common-tags'
// @ts-ignore
import hn from '!!raw-loader!./pages/examples/hacker-news.tsx'

// mimic babel plugin's behaviour to support SSR
let counter = 0
function hijackedStyled(...args: any[]) {
  // @ts-ignore
  return styled(...args)
}
const hash = 'runner'
const ignoredProps = Object.getOwnPropertyNames(Function)
Object.getOwnPropertyNames(styled).forEach((tag) => {
  if (ignoredProps.includes(tag)) return
  Object.defineProperty(hijackedStyled, tag, {
    get() {
      return styled[tag].withConfig({
        componentId: `sc-${hash}-${counter++}`,
      })
    },
  })
})

export const resetCounter = () => {
  counter = 0
}

export const scope = {
  ...React,
  styled: hijackedStyled,
  css,
  keyframes,
  createGlobalStyle,
  import: {
    react: React,
    'styled-components': {
      ...Styled,
      default: hijackedStyled,
      __esModule: true,
    },
  },
}

export const examples = [
  {
    key: 'inline-element',
    title: 'Inline element',
    code: codeBlock`
    <>
      <h2>React Runner</h2>
      <ul>
        <li>Inline element</li>
        <li>Function component</li>
        <li>
          Class component, <b>with class fields support</b>
        </li>
        <li>
          Composing components with <b>render</b> or <b>export default</b>
        </li>
        <li>Server Side Rendering</li>
        <li><b>import</b> statement</li>
        <li><a href="#multi-files">Multi files</a></li>
        <li>Typescript</li>
      </ul>
      <div>
        <span>Hacker News </span>
        <a href="#hacker-news">in react-runner</a>
        <span> vs </span>
        <a href="examples/hacker-news">in real world</a>
      </div>
    </>
    `,
  },
  {
    key: 'function-component',
    title: 'Function Component',
    code: codeBlock`
    function Counter() {
      const [count, setCount] = React.useState(0)

      return (
        <>
          <input value={count} readOnly />
          <button onClick={() => setCount(count => count + 1)}>+</button>
          <button onClick={() => setCount(count => count - 1)}>-</button>
        </>
      )
    }
    `,
  },
  {
    key: 'class-component',
    title: 'Class Component with fields support',
    code: codeBlock`
    class Counter extends React.Component {
      state = {
        count: 0,
      }

      onIncrement = () => {
        this.setState(({ count }) => ({
          count: count + 1,
        }))
      }

      onDecrement = () => {
        this.setState(({ count }) => ({
          count: count - 1,
        }))
      }

      render() {
        return (
          <>
            <input value={this.state.count} readOnly />
            <button onClick={this.onIncrement}>+</button>
            <button onClick={this.onDecrement}>-</button>
          </>
        )
      }
    }
    `,
  },
  {
    key: 'export-default',
    title: 'export default Component',
    code: codeBlock`
    const Button = styled.button\`
      background: transparent;
      color: steelblue;
      border: 2px solid steelblue;
      margin: 5px 10px;
      padding: 5px 10px;
      font-size: 16px;
      border-radius: 4px;

      \${props => props.primary && css\`
        background: steelblue;
        color: white;
      \`}
    \`

    export default () => (
      <>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </>
    )
    `,
  },
  {
    key: 'render',
    title: 'render(<Component />)',
    code: codeBlock`
    const Button = styled.button\`
      background: transparent;
      color: steelblue;
      border: 2px solid steelblue;
      margin: 5px 10px;
      padding: 5px 10px;
      font-size: 16px;
      border-radius: 4px;

      \${props => props.primary && css\`
        background: steelblue;
        color: white;
      \`}
    \`

    render(
      <>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </>
    )
    `,
  },
  {
    key: 'hacker-news',
    title: 'Hacker News (Typescript)',
    code: hn,
  },
]
