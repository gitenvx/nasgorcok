import whisper
import json

model = whisper.load_model("base")

result = model.transcribe(
    "public/audio/bg.mp3",
    word_timestamps=True,
    language="id",
)

words = []
for segment in result["segments"]:
    for word in segment.get("words", []):
        words.append({
            "word":  word["word"].strip(),
            "start": round(word["start"], 2),
            "end":   round(word["end"], 2),
        })

with open("public/audio/lyrics.json", "w", encoding="utf-8") as f:
    json.dump(words, f, ensure_ascii=False, indent=2)

print(f"Done! {len(words)} kata ditulis ke public/audio/lyrics.json")