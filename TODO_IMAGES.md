# TODO: Problème de structure des dossiers d'images

## Problème identifié

Les images sont actuellement dans le mauvais dossier:
- **Emplacement actuel:** `2026/ISF_Ulaval_web/public/`
- **Emplacement attendu:** `public/` (à la racine du projet)

## Images concernées

### Dossier executif
- Présidente.jpg
- Vp Exécutive.jpg
- Vp Trésorerie.jpg
- Vp Interne.jpg
- Vp Communication.jpg
- Vp Événementiel .jpg
- Vp Externe.jpg
- Vp Leadership.jpg
- Assistante Externe.jpg
- Assistant Leadership.jpg

### Dossier partenaires
- cadeul.png
- aesgul.png
- aegseg.png
- departement de genie civil.png
- faculte sciences et genie.png

### Dossier projets
- isfPuit.png
- puit_construction.jpg
- puit_construction1.jpg
- puit_construction2.jpg
- puit_construction3.jpg (manquant)
- puit_construction4.jpg
- puit_construction5.jpg
- puit_construction6.jpg
- puit_construction7.jpg
- puit.jpg
- puit7.jpg
- puit8.jpg
- puits.jpg

## Solution requise

**Option 1:** Déplacer le contenu de `2026/ISF_Ulaval_web/public/` vers `public/` à la racine
```bash
mv 2026/ISF_Ulaval_web/public/* public/
```

**Option 2:** Ajuster la configuration Vite pour pointer vers le bon dossier public

## Images manquantes à ajouter plus tard

1. `/testimonials/stagiaire-1.jpg` - Pour la page Stages
2. `/testimonials/stagiaire-2.jpg` - Pour la page Stages
3. `/projets/puit_construction3.jpg` - Pour la page Nos Projets (section interviews)
4. `/executif/Vp Projet d'ingénierie.jpg` - Pour la page Comité Exécutif
5. `/executif/Assistante Projet d'ingénierie.jpg` - Pour la page Comité Exécutif

Ces images ont été remplacées par des placeholders avec icônes en attendant.
