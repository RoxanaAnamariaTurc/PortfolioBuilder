export interface ValidationIssue {
  path: string;
  message: string;
}

export class ValidationError extends Error {
  constructor(public issues: ValidationIssue[]) {
    super("Validation failed");
    this.name = "ValidationError";
  }
}

export interface Schema<T> {
  parse(value: unknown, path?: string): T;
}

const normalizePath = (path?: string) => path ?? "";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i;

export interface StringOptions {
  minLength?: { value: number; message: string };
  email?: { message: string };
  url?: { message: string };
}

export const string = (options: StringOptions = {}): Schema<string> => ({
  parse(value: unknown, path?: string) {
    const normalizedPath = normalizePath(path);
    if (typeof value !== "string") {
      throw new ValidationError([
        {
          path: normalizedPath,
          message: "Expected string",
        },
      ]);
    }

    if (options.minLength && value.trim().length < options.minLength.value) {
      throw new ValidationError([
        {
          path: normalizedPath,
          message: options.minLength.message,
        },
      ]);
    }

    if (options.email && !emailRegex.test(value)) {
      throw new ValidationError([
        {
          path: normalizedPath,
          message: options.email.message,
        },
      ]);
    }

    if (options.url && value.trim().length > 0 && !urlRegex.test(value)) {
      throw new ValidationError([
        {
          path: normalizedPath,
          message: options.url.message,
        },
      ]);
    }

    return value;
  },
});

export const array = <T>(itemSchema: Schema<T>): Schema<T[]> => ({
  parse(value: unknown, path?: string) {
    const normalizedPath = normalizePath(path);
    if (!Array.isArray(value)) {
      throw new ValidationError([
        {
          path: normalizedPath,
          message: "Expected array",
        },
      ]);
    }

    const result: T[] = [];
    const issues: ValidationIssue[] = [];

    value.forEach((item, index) => {
      try {
        result.push(itemSchema.parse(item, `${normalizedPath}[${index}]`));
      } catch (error) {
        if (error instanceof ValidationError) {
          issues.push(...error.issues);
        } else {
          throw error;
        }
      }
    });

    if (issues.length > 0) {
      throw new ValidationError(issues);
    }

    return result;
  },
});

export const object = <T extends Record<string, unknown>>(
  shape: { [K in keyof T]: Schema<T[K]> }
): Schema<T> => ({
  parse(value: unknown, path?: string) {
    const normalizedPath = normalizePath(path);
    if (
      typeof value !== "object" ||
      value === null ||
      Array.isArray(value)
    ) {
      throw new ValidationError([
        {
          path: normalizedPath,
          message: "Expected object",
        },
      ]);
    }

    const issues: ValidationIssue[] = [];
    const result = {} as T;
    const recordValue = value as Record<string, unknown>;

    (Object.keys(shape) as Array<keyof T>).forEach((key) => {
      const nestedPath = normalizedPath ? `${normalizedPath}.${String(key)}` : String(key);
      try {
        const rawValue = recordValue[String(key)];
        result[key] = shape[key].parse(rawValue, nestedPath);
      } catch (error) {
        if (error instanceof ValidationError) {
          issues.push(...error.issues);
        } else {
          throw error;
        }
      }
    });

    if (issues.length > 0) {
      throw new ValidationError(issues);
    }

    return result;
  },
});

export const withDefault = <T>(schema: Schema<T>, defaultValue: T): Schema<T> => ({
  parse(value: unknown, path?: string) {
    if (value === undefined) {
      return defaultValue;
    }
    return schema.parse(value, path);
  },
});
