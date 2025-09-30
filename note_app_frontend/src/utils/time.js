/**
 * Simple "time ago" formatter without external dependencies.
 * PUBLIC_INTERFACE
 */
export function timeAgo(dateInput) {
  /** Returns a human-readable relative time like "5 minutes ago". */
  const now = new Date();
  const then = new Date(dateInput);
  const diffMs = now - then;
  if (Number.isNaN(diffMs)) return '';

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 45) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 2) return 'a minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 2) return 'an hour ago';
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 2) return 'yesterday';
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months < 2) return 'a month ago';
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);
  if (years < 2) return 'a year ago';
  return `${years} years ago`;
}
