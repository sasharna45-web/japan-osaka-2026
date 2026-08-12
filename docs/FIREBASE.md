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

## Security Rules (обязательно Publish)

Сейчас без Publish база может быть в test-mode (открыта целиком). Агент GitHub **не может** записать rules без вашего логина в Firebase.

### Вариант A — Console (30 сек)

1. Откройте [Realtime Database → Rules](https://console.firebase.google.com/project/japan-travel-2026-53a24/database/japan-travel-2026-53a24-default-rtdb/rules)
2. Замените всё на:

```json
{
  "rules": {
    "trips": {
      "japan-osaka-2026": {
        ".read": true,
        ".write": true
      },
      "$other": {
        ".read": false,
        ".write": false
      }
    }
  }
}
```

3. **Publish**

Проверка: запись в `trips/other-trip` должна дать Permission denied; в `trips/japan-osaka-2026` — ок.

### Вариант B — CLI

```bash
firebase login
firebase deploy --only database
```

(`firebase.json` + `.firebaserc` уже в репо.)

## Offline

Без сети трекер работает из localStorage. Когда сеть появится — `on('value')` подтянет облако; локальные изменения пишутся в Firebase при `save()`.

Чек-листы `index.html` / USJ в облако **не** синхронизируются.
