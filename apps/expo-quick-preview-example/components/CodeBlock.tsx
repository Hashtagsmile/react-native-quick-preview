import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { radius, spacing } from '../theme'

// A lightweight docs-style code block: a title bar with a language label and a
// Copy button, plus minimal syntax highlighting.
const PALETTE = {
  plain: '#e6edf3',
  keyword: '#ff7b72',
  string: '#a5d6ff',
  comment: '#8b949e',
  component: '#7ee787',
  fn: '#d2a8ff',
  punct: '#c9d1d9',
} as const

type Color = keyof typeof PALETTE

const KEYWORDS = new Set([
  'import', 'from', 'export', 'default', 'const', 'let', 'var', 'function', 'return',
  'new', 'await', 'async', 'if', 'else', 'true', 'false', 'null', 'undefined', 'as',
])

const TOKEN = /(\/\/[^\n]*)|(`[^`]*`|'[^']*'|"[^"]*")|([A-Za-z_$][A-Za-z0-9_$]*)|(\s+)|(.)/g

function tokenize(code: string): { text: string; color: Color }[] {
  const out: { text: string; color: Color }[] = []
  let m: RegExpExecArray | null
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(code))) {
    const [full, comment, str, word, ws] = m
    if (comment) out.push({ text: full, color: 'comment' })
    else if (str) out.push({ text: full, color: 'string' })
    else if (word) {
      const color: Color = KEYWORDS.has(word)
        ? 'keyword'
        : /^[A-Z]/.test(word)
          ? 'component'
          : /^(present|close|update|isOpen|useState|useQuickPreview)$/.test(word)
            ? 'fn'
            : 'plain'
      out.push({ text: full, color })
    } else if (ws) out.push({ text: full, color: 'plain' })
    else out.push({ text: full, color: 'punct' })
  }
  return out
}

export function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await Clipboard.setStringAsync(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <View style={styles.block}>
      <View style={styles.bar}>
        <Text style={styles.lang}>{lang}</Text>
        <Pressable onPress={copy} hitSlop={10} style={styles.copy}>
          <Ionicons
            name={copied ? 'checkmark' : 'copy-outline'}
            size={13}
            color={copied ? PALETTE.component : '#9aa5b1'}
          />
          <Text style={[styles.copyText, copied && { color: PALETTE.component }]}>
            {copied ? 'Copied' : 'Copy'}
          </Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.codeScroll}>
        <Text style={styles.code}>
          {tokenize(code).map((tok, i) => (
            <Text key={i} style={{ color: PALETTE[tok.color] }}>
              {tok.text}
            </Text>
          ))}
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  block: { backgroundColor: '#0d1117', borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: '#21262d' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#21262d',
  },
  lang: { fontSize: 11, fontWeight: '700', color: '#8b949e', letterSpacing: 0.5, textTransform: 'uppercase' },
  copy: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  copyText: { fontSize: 12, fontWeight: '600', color: '#9aa5b1' },
  codeScroll: { padding: spacing.md },
  code: { fontFamily: 'monospace', fontSize: 12.5, lineHeight: 20 },
})
