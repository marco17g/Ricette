Questa repository raccoglie un sito web di ricette nato per digitalizzare e tenere traccia di tutte le preparazioni fatte in casa, eliminando la necessità di utilizzare fogli di carta o libriccini scritti a mano.

📂 Struttura del Progetto
ricette.html: 
- costituisce la pagina principale del sito. Sfrutta una visualizzazione a griglia con card interattive, ciascuna delle quali mostra un'anteprima, le informazioni principali, le valutazioni a stelle e il percorso diretto alla guida dedicata.

Pagine di dettaglio (file .html):
- raccolgono le istruzioni passo-passo e la preparazione dettagliata per ogni singola ricetta.

Fogli di stile CSS:
- Un foglio di stile principale dedicato alla pagina d'indice (ricette.html) per gestire layout, griglie responsive (grid), tipografia e componenti UI.
- Fogli di stile specifici dedicati alla formattazione e alla lettura ottimizzata delle singole pagine di ricetta.

app.js: 
- script JavaScript che gestisce l'interattività del sito, in particolare il comportamento delle finestre modali (es. la sezione blog) implementando l'accessibilità da tastiera con il pattern focus trap,
  la gestione del tasto ESC e il blocco dello scroll di pagina quando la modale è attiva.  
