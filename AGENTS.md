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
- Bundled and local weeks carry optional per-slot portion multipliers; compute macros from scaled ingredients, preserve multipliers in copies and JSON, and reset a replaced slot to one portion so meals, shopping and backups agree. Ready bundled plans are included as portable local copies on export without seeding localStorage.
- Store custom ingredient quantities per whole recipe and manual macros per serving; normalize only compatible shopping units to avoid guessing density or piece weights.
- Import local JSON additively and remap colliding IDs plus assignments so existing data is never overwritten.

- Add recipe collections via the shared bundled recipe index and isolate new nutrition profiles so previous recipe values and week assignments remain unchanged.
- Derive collection filters from bundled and custom tags; keep optional protein variants separate from partner portions and materialize selected variants into custom copies for planning and backups without changing assignment schemas.
- Declare liquid units by ingredient ID in the shared adapter so nutrition, recipe display, custom copies and shopping preserve ml without density inference.
- Explicit partner ingredient lists replace the base portion; legacy extra ingredients remain additive, preventing double counting.
- Equipment uses optional shared tags and read-time inference for legacy recipes; optional validated custom tags preserve old local exports without rewriting user data.
- Fridge matching and week generation use a shared per-serving recipe adapter and pure local helpers; only compatible units and explicit synonyms match, with unknown quantities never treated as sufficient.
- Extend the v1 local overlay with optional validated reviews, pantry and extra shopping fields so old backups remain byte-shape compatible; remap imported custom review keys and merge conflicts without replacing existing notes or ratings.
- Store recipe photos in a separate IndexedDB Blob store keyed by stable recipe IDs; decode and resize in browser handlers, use revocable object URLs, and keep media out of localStorage and the repository.
- Photo backups use a versioned JSON envelope with base64 images only for transfer; validate/recompress before transactional IndexedDB import and remap photo recipe IDs through the same additive data merge.
