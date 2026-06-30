// ─── Types ───────────────────────────────────────────────────────────────────

export interface MailerAttachment {
  filename: string;
  content?: string;
  contentType?: string;
  encoding?: string;
}

export interface SendEmailPayload {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  attachments?: MailerAttachment[];
}

export interface SendEmailResult {
  messageId: string;
  accepted: string[];
  rejected: string[];
}

export interface HealthStatus {
  status: 'healthy' | 'degraded';
  smtp: boolean;
  uptime: number;
  timestamp: string;
  version: string;
}

interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

interface ApiFailure {
  success: false;
  error: string;
  data?: Array<{ field: string; message: string }>;
}

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export class MailerError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly validationErrors?: Array<{ field: string; message: string }>,
    public readonly requestId?: string,
  ) {
    super(message);
    this.name = 'MailerError';
  }
}

// ─── Client ──────────────────────────────────────────────────────────────────

export interface MailerClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export class MailerClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(options: MailerClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? 'https://mailer.maberc.com').replace(/\/$/, '');
  }

  async sendEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
    return this.request<SendEmailResult>('POST', '/email/send', payload);
  }

  async isHealthy(): Promise<boolean> {
    const health = await this.checkHealth();
    return health.smtp;
  }

  async checkHealth(): Promise<HealthStatus> {
    const res = await fetch(`${this.baseUrl}/health`);
    const requestId = res.headers.get('X-Request-Id') ?? undefined;
    const json = (await res.json()) as ApiResponse<HealthStatus>;

    if (json.success) return json.data;

    throw new MailerError(
      json.error ?? `Health check failed (${res.status})`,
      res.status,
      json.data,
      requestId,
    );
  }

  async ping(): Promise<void> {
    const res = await fetch(`${this.baseUrl}/ping`);
    const requestId = res.headers.get('X-Request-Id') ?? undefined;
    const json = (await res.json()) as { success: boolean; error?: string };

    if (!res.ok || !json.success) {
      throw new MailerError(
        json.error ?? `Ping failed (${res.status})`,
        res.status,
        undefined,
        requestId,
      );
    }
  }

  private async request<T>(
    method: 'GET' | 'POST',
    path: string,
    body?: unknown,
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const requestId = res.headers.get('X-Request-Id') ?? undefined;
    const json = (await res.json()) as ApiResponse<T>;

    if (!res.ok || !json.success) {
      const failure = json as ApiFailure;
      throw new MailerError(
        failure.error ?? `Mailer request failed (${res.status})`,
        res.status,
        failure.data,
        requestId,
      );
    }

    return (json as ApiSuccess<T>).data;
  }
}
