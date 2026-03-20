# PLAN_DE_TEST.md

## 2. Analyse des Risques (Focus : Filtrage des Régions)

Cette analyse utilise la matrice de cours (Probabilité vs Impact) pour identifier les problèmes potentiels lors du développement et de l'utilisation du filtre.

### 2.1 Risques Produit (Utilisateur)
*Ce qui peut mal se passer pour l'utilisateur final.*

| ID        | Risque Identifié | Probabilité | Impact | Niveau |
|:----------| :--- | :--- | :--- | :---: |
| **RP-01** | **Mauvais filtrage :** L'utilisateur choisit une région mais voit des villes d'une autre région (mélange des données). | Probable | Impactant | **III** |
| **RP-02** | **Liste vide :** La liste des régions ne s'affiche pas dans le menu déroulant, rendant la recherche impossible. | Peu probable | Catastrophique | **III** |
| **RP-03** | **Oubli du Reset :** Le bouton "Réinitialiser" ne remet pas la région à "Toutes", ce qui fausse les recherches suivantes. | Probable | Peu impactant | **II** |

### 2.2 Risques Projet (Développement)
*Ce qui peut poser problème pendant la création du code.*

| ID        | Risque Identifié                                                                              | Probabilité | Impact | Niveau |
|:----------|:----------------------------------------------------------------------------------------------| :--- | :--- | :---: |
| **RP-01** | **Manque de temps :** Les développeurs n'ont pas le temps de développer le filtre par région. |  probable | Catastrophique | **III** |
| **RP-04** | **Données :** Fichier CSV utilisé est erronné                                                 | Peu probable | Catastrophique | **III** |

---

## 3. Périmètre des Tests

La campagne de tests actuelle est restreinte. Elle ne couvre pas l'intégralité de l'application "Explorateur".

**Élément inclus :**
* Uniquement la fonctionnalité de **« Filtrage des régions »** (menu déroulant et mise à jour de la liste).

**Éléments exclus :**
* Le curseur de population minimale.
* Le curseur de rayon.
* L'affichage des coordonnées GPS (Pin rouge).
* La performance globale du chargement de la carte.

---

## 4. Cas de Test (Filtrage par Région)

| ID | Titre du test | Description / Étapes | Résultat attendu |
| :--- | :--- | :--- | :--- |
| **TC-01** | Sélection région | Choisir "Bretagne" dans la liste. | Seules les villes de Bretagne s'affichent. |
| **TC-02** | Annulation | Choisir une région puis revenir sur "Toutes". | Toutes les villes de France réapparaissent. |
| **TC-03** | Bouton Reset | Changer la région et cliquer sur "Réinitialiser". | Le menu repasse sur "Toutes" automatiquement. |
