 # Tuto — Logique du Portfolio
 
 ## Structure globale (React)
 
 - **Entry point**
   - `src/main.tsx` monte l’application React et render `<App />`.
 
 - **Composition de la page**
   - `src/App.tsx` assemble tout le site dans cet ordre :
     - `MainLayout` (wrapper général)
     - `Navbar`
     - `Hero`
     - `Skills`
     - `Projects`
     - `Contact`
 
 - **Navigation (ancres)**
   - Le menu utilise des liens de type `#id`.
   - La source de vérité est `navLinks` dans `src/components/constants/constants.tsx`.
   - Chaque section expose un `id` correspondant :
     - `Hero` → `id="hero"`
     - `Skills` → `id="skills"`
     - `Projects` → `id="projects"`
     - `Contact` → `id="contact"`
   - Le composant `NavLinkItem` rend un simple `<a href="#...">` et ferme le menu via `onClick`.
 
 ## Données affichées (constants)
 
 Tout ce qui est “contenu” (skills, projets, liens) est centralisé dans :
 
 - `src/components/constants/constants.tsx`
   - `mySkills` : liste des compétences (affichées dans `Skills`).
   - `projectsList` : liste des projets (affichés dans `Projects`).
   - `navLinks` : liens de navigation (utilisés par la `Navbar`).
 
 ### Projects (filtrage)
 
 - `src/sections/Projects.tsx`
   - Il y a 3 onglets : `web`, `mobile`, `design`.
   - `activeTab` est stocké en state.
   - `filteredProjects = projectsList.filter(p => p.category === activeTab)`.
   - Le composant `ProjectCard` reçoit `data={filteredProjects}` et affiche les cartes.
 
 ## Animations (GSAP) : philosophie
 
 L’idée générale est :
 
 - Les sections déclenchent leurs animations quand elles entrent dans le viewport.
 - Certaines sections utilisent des animations “scrub” (liées au scroll) avec `ScrollTrigger`.
 
 Exemples :
 
 - `Navbar` :
   - se cache/affiche selon la direction du scroll.
   - anime le logo et le burger via `ScrollTrigger`.
 - `Skills` :
   - pin la section et fait défiler/monter les cartes de compétences en fonction du scroll.
 - `Contact` :
   - fait apparaître des éléments (`fade-up`) avec une animation d’entrée.
 
 ## Hero + 3D : logique “scroll partagé” (sharedProgress)
 
 Le Hero possède une particularité : une animation GSAP et une animation 3D sont **pilotées par une même valeur de progression**.
 
 - La valeur partagée est :
   - `sharedProgress` dans `src/components/constants/constants.tsx`
   - `sharedProgress.value` : la valeur actuelle (0 → 1)
   - `sharedProgress.target` : la cible (0 → 1), vers laquelle on lisse (lerp)
 
 ### Côté Hero (`src/sections/Hero.tsx`)
 
 - Un `wheel` listener détecte la molette **uniquement quand la zone statue est dans la bonne zone de viewport**.
 - Tant que `sharedProgress.value` n’a pas atteint ~`1`, on “verrouille” le scroll :
   - on fait `e.preventDefault()`
   - on incrémente `sharedProgress.target` (clamp entre 0 et 1)
 - Ensuite, une boucle via `gsap.ticker` rapproche progressivement :
   - `sharedProgress.value += (target - value) * 0.09`
 - Le `timelineRef` du Hero est piloté par :
   - `timelineRef.current.progress(sharedProgress.value)`
 
 Résultat : la timeline du Hero avance de façon fluide selon la molette, sans dépendre directement du scroll natif.
 
 ### Côté 3D (`src/components/3dStatue.tsx`)
 
 - Le composant `Statue` crée un `<Canvas />` via `@react-three/fiber`.
 - Le contrôleur (`CameraAndModelController`) construit aussi une timeline GSAP (caméra + transform du canvas).
 - Dans `useFrame`, on “colle” la timeline à la valeur partagée :
   - `timelineRef.current.progress(sharedProgress.value)`
 
 Résultat : la **caméra 3D** et la **mise en page du canvas** évoluent en même temps que l’animation UI du Hero.
 
 ## C’est quoi les fichiers `.glb` dans `public/models` ?
 
 Dans ton projet, `public/models` contient :
 
 - `greek_statue_head.glb` (~21 MB)
 - `greek_statue_head-transformed.glb` (~0.6 MB)
 
 ### Définition
 
 - `.glb` est la version **binaire** du format **glTF** (`.gltf` / `.glb`).
 - Un `.glb` peut contenir :
   - **géométrie** (mesh)
   - **matériaux** / textures
   - **hiérarchie** (nodes)
   - parfois des animations
 
 En pratique : c’est un “pack” 3D optimisé pour le web, que Three.js sait charger facilement.
 
 ### Pourquoi 2 fichiers ?
 
 - `greek_statue_head.glb` semble être le fichier original (très lourd).
 - `greek_statue_head-transformed.glb` est une version **transformée/optimisée** (plus légère), typiquement :
   - compression
   - suppression d’éléments inutiles
   - simplification
   - normalisation des nodes/materials
 
 La version “transformed” est généralement préférable pour un portfolio (temps de chargement + perf).
 
 ### Comment ils sont utilisés dans le code
 
 - Le modèle est chargé dans `src/components/Greek_statue_head.tsx` :
   - `useGLTF('/models/greek_statue_head-transformed.glb')`
 - Le chemin commence par `/models/...` parce que tout ce qui est dans `public/` est servi statiquement à la racine du site.
 - Le composant `Model` renvoie un `<mesh />` avec la `geometry` et le `material` extraits du GLB.
 - Le modèle est ensuite rendu dans `src/components/3dStatue.tsx` via :
   - `<Model scale={[1,1,1]} />`
 
 ### Points importants (pratiques)
 
 - Un `.glb` trop lourd peut ralentir :
   - le premier chargement
   - le LCP
   - la fluidité des animations
 - Si tu ajoutes un nouveau modèle :
   - dépose-le dans `public/models`
   - charge-le avec `useGLTF('/models/ton-modele.glb')`
   - ajuste `position/scale` selon ton modèle
