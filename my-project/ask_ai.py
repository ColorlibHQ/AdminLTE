import os
import json
import urllib.request
import urllib.error

# --- Читаем .env вручную (без python-dotenv) ---
def load_dotenv(path=".env"):
    if not os.path.exists(path):
        return
    with open(path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# --- Формируем запрос к OpenAI API ---
prompt = (
    "Придумай 3 креативных названия для моего проекта: "
    "веб-приложение для изучения иностранных языков с помощью ИИ"
)

payload = json.dumps({
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": prompt}],
}).encode()

req = urllib.request.Request(
    "https://api.openai.com/v1/chat/completions",
    data=payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    },
)

print("Отправляю запрос к OpenAI...\n")
try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read())
    answer = data["choices"][0]["message"]["content"]
    print("Ответ от OpenAI:")
    print("-" * 40)
    print(answer)
    print("-" * 40)
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"HTTP {e.code}: {body}")
except Exception as e:
    print(f"Ошибка: {e}")
