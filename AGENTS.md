<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep bundled recipes/weeks immutable; user data lives in a versioned, validated local overlay provided at the root, because the app must work without a backend.
- Store custom ingredient quantities per whole recipe and manual macros per serving; normalize only compatible shopping units to avoid guessing density or piece weights.
- Import local JSON additively and remap colliding IDs plus assignments so existing data is never overwritten.

- Add recipe collections via the shared bundled recipe index and isolate new nutrition profiles so previous recipe values and week assignments remain unchanged.
- Explicit partner ingredient lists replace the base portion; legacy extra ingredients remain additive, preventing double counting.
