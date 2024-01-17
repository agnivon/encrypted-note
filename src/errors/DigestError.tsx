export class DigestError extends Error {
  constructor(message: string) {
    super(message);

    // Custom properties
    this.name = "DigestError";

    // Capture the stack trace, excluding the constructor call
    Error.captureStackTrace(this, DigestError);
  }

  // You can add custom methods as well
  logError() {
    console.error(`[${this.name}] ${this.message}`);
  }
}
