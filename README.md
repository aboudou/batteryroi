# Rentabilité Batterie Solaire

Calculateur statique pour estimer si une batterie de stockage domestique en autoconsommation solaire est rentable sur sa durée de vie.

## Utilisation

Ouvrir `index.html` directement dans un navigateur. Aucun serveur ni dépendance requis.

## Paramètres

| Champ | Unité | Défaut |
|---|---|---|
| Coût d'installation | € | 2 500 |
| Tarif d'achat électricité | €/kWh | 0,21 |
| Tarif de revente surplus | €/kWh | 0,13 |
| Capacité | kWh | 5,12 |
| Durée de vie | cycles | 6 000 |
| Capacité en fin de vie | % | 80 |
| Profondeur de décharge | % | 90 |
| Rendement | % | 90 |

## Méthode de calcul

```
Énergie utile = Capacité × Cycles × (DoD / 100) × (Rendement / 100) × ((100% + Fin de vie) / 2 / 100)
Économies     = Énergie utile × (Tarif achat − Tarif revente)
Résultat net  = Économies − Coût d'installation
```

La dégradation de capacité est modélisée de façon linéaire entre 100 % (neuf) et la capacité en fin de vie. Le facteur moyen sur la durée de vie est donc la moyenne des deux bornes.

> Ce calcul repose sur des hypothèses constantes (tarifs fixes, dégradation linéaire). Il ne tient pas compte de l'évolution des prix de l'électricité, de l'inflation ni des coûts de maintenance.

## Structure

```
batteryRoi/
├── index.html   — structure et logique de calcul
└── style.css    — styles (thème clair atténué, Syne + Outfit + JetBrains Mono)
```
