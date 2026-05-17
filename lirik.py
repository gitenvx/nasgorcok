import whisper
import json

model = whisper.load_model("base")  # bisa: tiny, base, small, medium

result = model.transcribe(
    "public/audio/bg.mp3",
    word_timestamps=True,   # timestamp per KATA
    language="id",          # ganti "en" kalau lagu bahasa inggris
)

# Flatten semua kata + timestamp-nya
words = []
for segment in result["segments"]:
    for word in segment.get("words", []):
        words.append({
            "word":  word["word"].strip(),
            "start": round(word["start"], 2),
            "end":   round(word["end"], 2),
        })

# Simpan ke public supaya bisa di-fetch React
with open("public/audio/lyrics.json", "w", encoding="utf-8") as f:
    json.dump(words, f, ensure_ascii=False, indent=2)

print(f"Done! {len(words)} kata ditulis ke public/audio/lyrics.json")