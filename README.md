# Pet Lookout

Pet Lookout
This app uses NodeJS, Express, HTML, CSS, JQuery, and Restful Routes. Users can lookup & add lost pets that they may find.

Screenshots:

<img width="1439" alt="Screen Shot 2019-06-10 at 11 22 21 AM" src="https://user-images.githubusercontent.com/11365270/59206069-26808400-8b72-11e9-8b51-b07d5ef0e9e1.png">
<img width="1440" alt="Screen Shot 2019-06-10 at 11 22 40 AM" src="https://user-images.githubusercontent.com/11365270/59206076-2c766500-8b72-11e9-81f1-d57d0a8a4863.png">

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




Consulted:

    1) "Express in Action" by Evan M. Hahn
    
    2) Youtube video https://youtu.be/5XL2Lwb7rds
