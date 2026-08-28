const isDev = import.meta.env.DEV

function format(level, context, data) {
  const time = new Date().toISOString()
  return data !== undefined
    ? [`[${time}] [${level}] ${context}`, data]
    : [`[${time}] [${level}] ${context}`]
}

export const logger = {
  debug: (context, data) => {
    if (isDev) console.debug(...format('DEBUG', context, data))
  },
  info: (context, data) => {
    if (isDev) console.info(...format('INFO', context, data))
  },
  warn: (context, data) => {
    console.warn(...format('WARN', context, data))
  },
  error: (context, data) => {
    console.error(...format('ERROR', context, data))
  },
}
