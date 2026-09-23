/**
 * Checks if URL is a direct video file (e.g. mp4, webm)
 * @param {string} url 
 * @returns {boolean}
 */
export function isDirectVideo(url) {
  if (!url) return false;
  const clean = url.toLowerCase().split('?')[0];
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.mov') || clean.startsWith('/videos/');
}

/**
 * Converts YouTube or Vimeo URL into embeddable iframe URL
 * @param {string} url 
 * @returns {string | null}
 */
export function toEmbed(url) {
  if (!url || isDirectVideo(url)) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    const parts = u.pathname.split('/').filter(Boolean);
    let id = null;

    if (host === 'youtu.be') {
      id = parts[0];
    } else if (host.endsWith('youtube.com')) {
      id = u.searchParams.get('v') || (['embed', 'shorts', 'live'].includes(parts[0]) ? parts[1] : null);
    }

    if (id) {
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    }

    if (host.endsWith('vimeo.com')) {
      const i = parts.findIndex(p => /^\d+$/.test(p));
      if (i > -1) {
        const hash = /^[a-z0-9]+$/i.test(parts[i + 1] || '') ? `&h=${parts[i + 1]}` : '';
        return `https://player.vimeo.com/video/${parts[i]}?autoplay=1${hash}`;
      }
    }
  } catch {
    // invalid URL format
  }
  return null;
}
