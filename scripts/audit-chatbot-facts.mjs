import { chatbotFactCases, routeChatbotIntent } from '../lib/chatbot-quality.ts'

const failures = []

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

if (failures.length) {
  console.error('Chatbot fact audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Chatbot fact audit passed across ${chatbotFactCases.length} deterministic cases.`)
