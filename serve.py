"""Tiny static server for the mockup. Same as `python -m http.server`, but tells the
browser never to cache, so a `git pull` always shows the latest version.

Usage:  python serve.py [port]      (default 8103)
"""
import http.server
import os
import sys

os.chdir(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8103
print(f"Serving on http://localhost:{port}")
http.server.ThreadingHTTPServer(("", port), Handler).serve_forever()
