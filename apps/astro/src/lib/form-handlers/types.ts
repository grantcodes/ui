export interface FormHandler {
  name: string;
  handle(data: Record<string, unknown>): Promise<void>;
}

export interface FormSubmission {
  name: string
  email: string
  message: string
  notifyEmail: string
  timestamp: string
}
