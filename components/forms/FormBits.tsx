export function RequiredMark() {
  return <span className="text-brass" aria-hidden="true">*</span>;
}

export function ErrorText({ error }: { error?: { message?: string } | null }) {
  if (!error?.message) {
    return null;
  }

  return (
    <p className="mt-2 text-sm text-ruby" role="alert">
      {error.message}
    </p>
  );
}

export function FormLabel({
  htmlFor,
  children,
  required = false
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm text-muted">
      {children} {required ? <RequiredMark /> : null}
    </label>
  );
}
