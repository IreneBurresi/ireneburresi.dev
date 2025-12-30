# Profile Data - Documentation

This directory contains centralized profile and CV data with i18n support.

## Overview

All profile-related data (experiences, skills, certifications, etc.) is now managed in a single source of truth: `profile.ts`. This eliminates duplication across multiple pages and makes updates easier and more maintainable.

## File Structure

```
src/data/
  └── profile.ts          # Single source of truth for all profile data
  └── README.md          # This file
```

## Usage

### Basic Import

```typescript
import {
  getExperiencesForLocale,
  getSkillsForLocale,
  getCertificationsForLocale,
  getEducationForLocale,
  getWorkPhilosophyForLocale,
  VISION_MISSION,
  ABOUT,
  CONTACT,
  LANGUAGES,
  getLocalized,
} from '@/data/profile';
```

### Getting Localized Data

```typescript
const locale = 'it'; // or 'en'

// Get experiences for a specific locale
const experiences = getExperiencesForLocale(locale);
// Returns: Array<{title: string, company: string, ...}>

// Get skills
const skills = getSkillsForLocale(locale);
// Returns: Array<{category: string, skills: string[]}>

// Get certifications
const certifications = getCertificationsForLocale(locale);

// Get education
const education = getEducationForLocale(locale);

// Get work philosophy
const workPhilosophy = getWorkPhilosophyForLocale(locale);
```

### Using Static Data

```typescript
// Vision & Mission
const vision = getLocalized(VISION_MISSION.vision, locale);
const mission = getLocalized(VISION_MISSION.mission, locale);

// About content
const bio = getLocalized(ABOUT.bio, locale);
const blogDescription = getLocalized(ABOUT.blogDescription, locale);
const topics = ABOUT.blogTopics[locale]; // Returns string[]

// Contact info
const email = CONTACT.email;
const location = getLocalized(CONTACT.location, locale);

// Languages
const languages = LANGUAGES[locale];
```

## Data Types

### LocalizedString

An object with Italian and English versions:

```typescript
interface LocalizedString {
  it: string;
  en: string;
}
```

### LocalizedStringArray

An object with Italian and English array versions:

```typescript
interface LocalizedStringArray {
  it: string[];
  en: string[];
}
```

## Current Usage

This data is currently used in:

- `src/pages/about/index.astro` (Italian about page)
- `src/pages/en/about/index.astro` (English about page)
- `src/pages/cv/index.astro` (Italian CV page)
- `src/components/layout/Footer.astro` (uses `PERSON` from `schema.ts`, but could use this too)

## Adding New Data

### Adding a new experience

Edit the `EXPERIENCES` array in `profile.ts`:

```typescript
{
  title: { it: 'Titolo IT', en: 'Title EN' },
  company: 'Company Name',
  period: { it: 'Periodo IT', en: 'Period EN' },
  type: { it: 'Tipo', en: 'Type' },
  current: true,
  description: {
    it: ['Descrizione 1', 'Descrizione 2'],
    en: ['Description 1', 'Description 2'],
  },
}
```

### Adding a new skill category

Edit the `SKILLS` array in `profile.ts`:

```typescript
{
  category: { it: 'Categoria IT', en: 'Category EN' },
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
}
```

### Adding a new certification

Edit the `CERTIFICATIONS` array in `profile.ts`:

```typescript
{
  name: { it: 'Nome IT', en: 'Name EN' },
  status: { it: 'Stato IT', en: 'Status EN' },
  provider: 'Provider Name', // optional
}
```

## Benefits

1. **Single Source of Truth**: Update data in one place, reflected everywhere
2. **Type Safety**: Full TypeScript support with autocomplete
3. **i18n Support**: Built-in Italian/English translations
4. **Consistency**: No risk of data going out of sync between pages
5. **Maintainability**: Easy to find and update content
6. **Testability**: Data can be validated and tested independently

## Migration Notes

Previously, data was duplicated across:
- `src/pages/about/index.astro` (lines 37-120)
- `src/pages/en/about/index.astro` (lines 37-120)
- `src/pages/cv/index.astro` (lines 16-107)

Now all this data lives in `src/data/profile.ts`.

## Future Enhancements

Consider these improvements:

1. **CMS Integration**: Easy to connect a headless CMS
2. **JSON Schema Validation**: Add runtime validation
3. **More Languages**: Easy to add French, Spanish, etc.
4. **Version Control**: Track changes to professional data over time
