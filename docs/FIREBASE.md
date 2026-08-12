# Firebase Realtime Database (трекер)

Путь данных: `/trips/japan-osaka-2026`  
Проект: `japan-travel-2026-53a24` (europe-west1)

## Структура (как localStorage `japan2026-tracker-v1`)

```json
{
  "done": { "d4-castle": true },
  "expenses": [{ "id": "...", "day": 4, "cat": "food", "amount": 1800, "note": "", "at": 0 }],
  "softDaily": 18000,
  "viewDay": 4,
  "exchange": { "usdChanged": 2825, "yenGot": 452000, "usdLeft": 400, "at": 0 },
  "updatedAt": 0
}
```

## Security Rules

В [Firebase Console](https://console.firebase.google.com/) → Realtime Database → Rules  
вставьте содержимое файла `database.rules.json` из корня репо и Publish.

Не оставляйте test-mode `.read/.write: true` на весь корень базы.

## Offline

Без сети трекер работает из localStorage. Когда сеть появится — `on('value')` подтянет облако; локальные изменения пишутся в Firebase при `save()`.

Чек-листы `index.html` / USJ в облако **не** синхронизируются.
