import { chatbotFactCases, routeChatbotIntent } from '../lib/chatbot-quality.ts'
import fs from 'node:fs'
import path from 'node:path'

const failures = []
const root = process.cwd()

for (const testCase of chatbotFactCases) {
  const route = routeChatbotIntent(testCase.message)
  const response = route.response || ''
  const normalized = response.toLowerCase()

  for (const expected of testCase.mustInclude) {
    if (!normalized.includes(expected.toLowerCase())) {
      failures.push(`"${testCase.message}" missing "${expected}"`)
    }
  }

  for (const forbidden of testCase.mustNotInclude) {
    if (normalized.includes(forbidden.toLowerCase())) {
      failures.push(`"${testCase.message}" included forbidden "${forbidden}"`)
    }
  }
}

const integrationChecks = [
  {
    file: 'components/EnhancedChatBot.tsx',
    patterns: ['routeChatbotIntent(userMessage)', 'getQuickRepliesForRoute', 'deterministicRoute.response'],
  },
  {
    file: 'app/api/chat/respond/route.ts',
    patterns: ['routeChatbotIntent(message)', 'routedDeterministically: true'],
  },
  {
    file: 'app/api/chat/route.ts',
    patterns: ['routeChatbotIntent(message)', 'deterministicRoute.response'],
  },
]

for (const check of integrationChecks) {
  const source = fs.readFileSync(path.join(root, check.file), 'utf8')
  for (const pattern of check.patterns) {
    if (!source.includes(pattern)) failures.push(`${check.file} is missing ${pattern}`)
  }
}

if (failures.length) {
  console.error('Chatbot fact audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Chatbot fact audit passed across ${chatbotFactCases.length} deterministic cases.`)
