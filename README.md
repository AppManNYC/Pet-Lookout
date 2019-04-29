# glowing-funicular

## RESTFUL ROUTES

name        url                     verb        description
=============================================================================
INDEX       /lostPets               GET         Display a list of all lost pets
NEW         /lostPets/new           GET         Displays form to add a new lost pet
CREATE      /lostPets               POST        Add new lost pet to DB
SHOW        /lostPets/:index        GET         Displays a single record of lost pets
EDIT        /lostPets/:index/edit   GET
UPDATE      /lostPets/:index        PUT
DESTROY     /lostPets/:index        DELETE