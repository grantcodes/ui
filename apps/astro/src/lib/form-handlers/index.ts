import type { FormHandler } from './types.ts'

export class ConsoleHandler implements FormHandler {
  name = 'console'
  
  async handle(data: Record<string, unknown>): Promise<void> {
    console.log('Form submission:', data)
  }
}

export class EmailHandler implements FormHandler {
  name = 'email'
  private notifyEmail: string
  
  constructor(notifyEmail: string) {
    this.notifyEmail = notifyEmail
  }
  
  async handle(data: Record<string, unknown>): Promise<void> {
    console.log(`[EmailHandler] Would send email to ${this.notifyEmail}`)
    console.log('Form data:', data)
  }
}
