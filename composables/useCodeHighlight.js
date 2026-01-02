/**
 * 코드 하이라이팅 유틸리티
 * shiki를 사용하여 코드를 하이라이팅합니다.
 */

import { getHighlighter } from 'shiki'

let highlighter = null

/**
 * shiki 하이라이터 초기화
 */
export async function initHighlighter() {
  if (highlighter) {
    return highlighter
  }

  try {
    highlighter = await getHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [
        'javascript',
        'typescript',
        'vue',
        'html',
        'css',
        'scss',
        'json',
        'bash',
        'shell',
        'markdown',
        'python',
        'java',
        'go',
        'rust',
        'sql',
        'yaml',
        'xml',
        'diff',
        'plaintext',
      ],
    })
    return highlighter
  } catch (error) {
    console.error('Failed to initialize shiki highlighter:', error)
    return null
  }
}

/**
 * 코드를 하이라이팅된 HTML로 변환
 * @param {string} code - 하이라이팅할 코드
 * @param {string} lang - 언어 (예: 'javascript', 'vue', 'html')
 * @param {string} theme - 테마 ('github-light' 또는 'github-dark')
 * @returns {string} 하이라이팅된 HTML
 */
export async function highlightCode(code, lang = 'plaintext', theme = 'github-light') {
  const hl = await initHighlighter()
  if (!hl) {
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }

  try {
    const html = hl.codeToHtml(code, {
      lang,
      theme,
    })
    return html
  } catch (error) {
    console.warn(`Failed to highlight code with lang "${lang}":`, error)
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

/**
 * HTML 이스케이프
 */
function escapeHtml(text) {
  if (typeof window === 'undefined') {
    // 서버 사이드: 간단한 이스케이프
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
  // 클라이언트 사이드
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Composable 함수
 */
export const useCodeHighlight = () => {
  return {
    highlightCode,
    initHighlighter,
  }
}

