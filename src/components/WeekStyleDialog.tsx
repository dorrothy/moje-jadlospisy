import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { WEEK_COLORS, WEEK_EMOJIS, WEEK_COLOR_LABELS, weekBgClass, type WeekColor } from "@/lib/custom-data";
import { cn } from "@/lib/utils";

export function WeekStyleDialog({ open, initial, onSave, onCancel }: {
  open: boolean;
  initial: { name: string; emoji?: string; color?: WeekColor };
  onSave: (next: { name: string; emoji: string; color: WeekColor }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial.name);
  const [emoji, setEmoji] = useState(initial.emoji ?? WEEK_EMOJIS[0]);
  const [color, setColor] = useState<WeekColor>(initial.color ?? WEEK_COLORS[0]);
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Ustawienia tygodnia</DialogTitle>
        <DialogDescription>Nazwa, ikonka i kolor — widoczne na kafelku tygodnia.</DialogDescription>
        <form
          className="mt-2 space-y-4"
          onSubmit={(e) => { e.preventDefault(); const n = name.trim(); if (n) onSave({ name: n, emoji, color }); }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="week-name">Nazwa</Label>
            <Input id="week-name" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} required />
          </div>
          <fieldset>
            <legend className="text-sm font-medium">Ikonka</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {WEEK_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  aria-label={`Ikonka ${e}`}
                  aria-pressed={emoji === e}
                  onClick={() => setEmoji(e)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border text-xl transition-colors",
                    emoji === e ? "border-primary bg-accent" : "bg-card",
                  )}
                >
                  {e}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium">Kolor</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {WEEK_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Kolor ${WEEK_COLOR_LABELS[c]}`}
                  aria-pressed={color === c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-10 w-10 rounded-full border-2 shadow-soft transition-transform",
                    weekBgClass({ color: c }),
                    color === c ? "scale-110 border-primary" : "border-transparent",
                  )}
                />
              ))}
            </div>
          </fieldset>
          <div className="flex gap-2 pt-1">
            <Button type="submit" className="flex-1">Zapisz</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Anuluj</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
