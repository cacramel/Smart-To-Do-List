from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Permitem Frontend-ului să comunice cu Backend-ul
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

activitati = [
    # Chill/Explorare
    {"id": 1, "vibe": "Chill/Explorare", "buget": "Sărac Lipit (0 lei)", "timp": "Rapid (30 min)", "text": "Găsește cel mai înalt garaj din cartier și privește apusul de acolo."},
    {"id": 2, "vibe": "Chill/Explorare", "buget": "Sărac Lipit (0 lei)", "timp": "Toată ziua", "text": "Urban Exploration: Caută o clădire părăsită și fotografiază detaliile uitate."},
    {"id": 3, "vibe": "Chill/Explorare", "buget": "Merge cinzeci de lei", "timp": "Câteva ore", "text": "Geocaching: Caută 'comori' ascunse prin oraș folosind aplicația oficială."},
    # Activ/Sport
    {"id": 4, "vibe": "Activ/Sport", "buget": "Sărac Lipit (0 lei)", "timp": "Câteva ore", "text": "Meci de fotbal pe bitum sub luminile stradale la 11 noaptea."},
    {"id": 5, "vibe": "Activ/Sport", "buget": "Bogați (100+ lei)", "timp": "Câteva ore", "text": "Închiriază biciclete electrice și fă turul complet al parcurilor mari."},
    # Caterincă/Random
    {"id": 6, "vibe": "Caterincă/Random", "buget": "Sărac Lipit (0 lei)", "timp": "Rapid (30 min)", "text": "People Watching: Stați pe o bancă și inventați vieți dramatice pentru trecători."},
    {"id": 7, "vibe": "Caterincă/Random", "buget": "Merge cinzeci de lei", "timp": "Câteva ore", "text": "Mers în cel mai vechi talcioc după cel mai bizar obiect de 10 lei."},
    # ... adaugă restul până la 100 aici
]

@app.get("/get-activity")
def get_activity(vibe: str = None, buget: str = None, timp: str = None):
    filtrate = [a for a in activitati if (not vibe or a['vibe'] == vibe) and 
                (not buget or a['buget'] == buget) and (not timp or a['timp'] == timp)]
    
    if not filtrate:
        return {"text": "Nu am găsit nimic așa specific... încearcă 'Sunt Indecis'!"}
    return random.choice(filtrate)

@app.get("/random")
def get_random():
    return random.choice(activitati)