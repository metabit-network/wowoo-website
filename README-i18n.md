# Internationalization (i18n) Implementation

This project now supports multiple languages: English, Korean, Chinese, and Japanese with automatic browser language detection.

## Features

- 🌍 **Multi-language Support**: English, Korean, Chinese, Japanese
- 🔍 **Browser Language Detection**: Automatically detects user's browser language
- 💾 **Persistent Language Selection**: Remembers user's language preference
- 🎨 **Beautiful Language Switcher**: Animated dropdown with flags
- 📱 **Responsive Design**: Works on all device sizes

## File Structure

```
public/
  locales/
    en.json     # English translations
    ko.json     # Korean translations
    zh.json     # Chinese translations
    ja.json     # Japanese translations

hooks/
  useLanguage.ts      # Language detection and management
  useTranslation.ts   # Translation loading and access

contexts/
  LanguageContext.tsx # Language state provider

components/
  LanguageSwitcher.tsx # Language selection UI
```

## How It Works

### 1. Language Detection

- The `useLanguage` hook automatically detects the user's browser language
- Falls back to English if the browser language is not supported
- Stores the selected language in localStorage for persistence

### 2. Translation Loading

- The `useTranslation` hook loads JSON translation files from `/public/locales/`
- Provides a `t()` function to access translations using dot notation
- Falls back to English if a translation file is missing

### 3. Language Switching

- The `LanguageSwitcher` component provides a beautiful dropdown interface
- Users can change languages at any time
- The selection is immediately applied and persisted

## Usage

### Adding New Translations

1. **Add new keys to all language files** (`en.json`, `ko.json`, `zh.json`, `ja.json`):

```json
{
  "newSection": {
    "title": "English Title",
    "description": "English description"
  }
}
```

2. **Use translations in components**:

```tsx
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

function MyComponent() {
  const { currentLanguage } = useLanguageContext();
  const { t } = useTranslation(currentLanguage);

  return (
    <div>
      <h1>{t("newSection.title")}</h1>
      <p>{t("newSection.description")}</p>
    </div>
  );
}
```

### Adding New Languages

1. **Create a new translation file** in `public/locales/` (e.g., `fr.json`)
2. **Update the `SUPPORTED_LANGUAGES` array** in `hooks/useLanguage.ts`
3. **Add language name and flag** to the `LanguageSwitcher` component

### Translation Keys Structure

The translation files use a nested structure for organization:

```json
{
  "section": {
    "subsection": {
      "key": "value"
    }
  }
}
```

Access with: `t('section.subsection.key')`

## Browser Language Detection

The system automatically detects browser languages in this order:

1. Korean (`ko`, `ko-KR`)
2. Chinese (`zh`, `zh-CN`, `zh-TW`)
3. Japanese (`ja`, `ja-JP`)
4. English (fallback)

## Performance

- Translation files are loaded asynchronously
- Only the current language's translation file is loaded
- Loading states are handled gracefully
- Fallback to English if translations fail to load

## Accessibility

- Language switcher is keyboard accessible
- Screen reader friendly
- Proper ARIA labels and roles
- High contrast design

## Customization

### Styling the Language Switcher

The `LanguageSwitcher` component can be customized by modifying its CSS classes or creating a new component that uses the same hooks.

### Adding Language-Specific Fonts

You can add language-specific fonts by modifying the layout or CSS:

```css
/* For Chinese/Japanese */
[lang="zh"],
[lang="ja"] {
  font-family: "Noto Sans CJK", sans-serif;
}

/* For Korean */
[lang="ko"] {
  font-family: "Noto Sans KR", sans-serif;
}
```

## Troubleshooting

### Translation Not Loading

- Check that the JSON file exists in `/public/locales/`
- Verify JSON syntax is valid
- Check browser console for errors

### Language Not Detected

- Ensure the browser language is supported
- Check that the language code mapping is correct in `useLanguage.ts`

### Performance Issues

- Consider code-splitting translations for large apps
- Implement lazy loading for non-critical translations
