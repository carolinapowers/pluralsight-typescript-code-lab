import type { File, Reporter, TaskResult } from 'vitest'

export default class CustomReporter implements Reporter {
  onFinished(files: File[] = []) {
    // Count test results
    let numFailedTests = 0
    let numPassedTests = 0
    let numTodoTests = 0
    let numRuntimeErrorTestSuites = 0
    let allFailureMessages: string[] = []

    files.forEach(file => {
      if (file.result?.state === 'fail') {
        numRuntimeErrorTestSuites++
      }
      
      // Recursively collect tasks from the file
      const collectTasks = (tasks: any[]): TaskResult[] => {
        const results: TaskResult[] = []
        tasks.forEach(task => {
          if (task.type === 'test') {
            results.push(task.result)
          } else if (task.tasks) {
            results.push(...collectTasks(task.tasks))
          }
        })
        return results
      }

      const taskResults = collectTasks(file.tasks || [])
      
      taskResults.forEach(result => {
        if (result?.state === 'fail') {
          numFailedTests++
          // Extract error messages from failed tasks
          if (result.errors && result.errors.length > 0) {
            result.errors.forEach(error => {
              if (error?.message) {
                allFailureMessages.push(error.message)
              }
            })
          }
        } else if (result?.state === 'pass') {
          numPassedTests++
        } else if (result?.mode === 'todo') {
          numTodoTests++
        }
      })
    })

    // Apply the same logic as the Jest reporter
    if (numFailedTests === 0 && numTodoTests === 0) {
      console.log("All tests passed successfully!")
    } else if (allFailureMessages.length > 0) {
      // Process all failure messages to find the custom message
      let customMessage: string | null = null
      
      for (const message of allFailureMessages) {
        // Look for the expect call with custom message pattern
        const expectMatch = message.match(/expect\(\s*[^,]+,\s*['"](.*?)['"]\s*\)/)
        if (expectMatch) {
          customMessage = expectMatch[1]
          break
        }
        
        // Alternative: look for custom message before ": expected"  
        const colonIndex = message.indexOf(': expected')
        if (colonIndex !== -1) {
          customMessage = message.substring(0, colonIndex)
          break
        }
      }
      
      if (customMessage) {
        // If message already contains line breaks, respect them
        // Otherwise, format to fit 68 characters per line
        if (customMessage.includes('\n')) {
          console.log(customMessage)
        } else {
          const matches = customMessage.match(/\S.{1,68}\S(?= |$)/g)
          const formattedMessage = matches ? matches.join("\n") : customMessage
          console.log(formattedMessage)
        }
      } else {
        // Fallback to first message
        console.log(allFailureMessages[0])
      }
    }
  }
}