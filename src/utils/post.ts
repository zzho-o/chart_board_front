export const RAW_FORBIDDEN = ['캄보디아', '프놈펜', '불법체류', '텔레그램', 'telegram'] as const;

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const norm = (s: string) => (s || '').normalize('NFKC').toLowerCase();

const squash = (s: string) => norm(s).replace(/[^\p{L}\p{N}]+/gu, '');

const FORBIDDEN_REGEX = (() => {
  const variants = RAW_FORBIDDEN.flatMap(w => {
    const n = norm(w);
    const s = squash(w);
    return Array.from(new Set([n, s])).filter(v => v.length > 0);
  });

  return new RegExp(`(${variants.map(esc).join('|')})`, 'iu');
})();

export const hasForbiddenWords = (...fields: (string | undefined | null)[]) => {
  const joined = fields.filter(Boolean).join(' ');
  const collapsed = squash(joined);
  return FORBIDDEN_REGEX.test(collapsed);
};

export const normalizeTags = (input: string[] | string): string[] => {
  const arr = Array.isArray(input) ? input : input.split(',').map(s => s.trim());
  const uniq = Array.from(new Set(arr.filter(Boolean)));
  return uniq.slice(0, 5).map(t => t.slice(0, 24));
};
