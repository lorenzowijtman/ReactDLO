# Styleguide html, css, js

In dit document wordt uitgelegdt waar sowieso naar gekeken wordt tijdens een code review als jou code moet aan alle punten voldoen.

## HTML
We gaan voor dit project de HTML5 Style Guide and Coding Conventions van w3schools gebruiken dit is over het algemeen de style guide die iedereen gebruikt voor html met een kleine toevoeging die hier onder staat 

[link naar styleguide](https://www.w3schools.com/html/html5_syntax.asp)

### Engels
Alles is in het engels (Elementen, attributes, classes, ids) dus ook comments Content voor de gebruiker moet natuurlijk wel in het nederlands.

Fout
```html
<section class="sectie-tekst">
  <p>This is a paragraph.</p>
  <p>This is a paragraph.</p>
</section>
```

Goed
```html
<section class="section-text">
  <p>Dit is een paragraaf.</p>
  <p>Dit is een paragraaf.</p>
</section>
```

## CSS
Voor css gaan we de styleguide van Airbnb gebruiken die is hier te vinden

[link naar styleguide](https://github.com/airbnb/css)


## JS
Voor js / React gaan we de styleguide van Airbnb gebruiken die is hier te vinden

[link naar styleguide](https://github.com/airbnb/javascript)

## Naamgeving en mappen (Belangrijk)
Bij het maken van een nieuwe React component is het belangrijk dat deze in de correcte mappen komt in de ui/ map staan 4 mappen.

### The golden structure
In deze 4 mappen wordt elke keer onderscheid gemaakt tussen Admin, Student en general. Als iets alleen bedoel is voor een admin / leerkracht zet dat dan ook in het mapje admin/.

### Nieuw bestand aanmaken
Maak eerst een map aan in de JUISTE MAP noem deze folder zoals je je bestand ook gaat noemen bijvoorbeeld Dashboard.js staat in de map dashboard.

Dit doen we zodat alles netjes bij elkaar staat (js, json en scss).

### Naamgeving 
Hier een kleine opsomming met de naamgeving format

Folders > camelCase

js bestanden > PascalCase

andere bestanden > camelCase

Geef alles een duidelijk naam (dit is lastig) een vereiste is dan ook dat door de naam gelijk duidelijk moet worden wat het bestand doet. 

Zo kan iedereen s`nachts fijn(er) slapen.

### routes/
Deze map wordt gebruikt voor de het aangeven van Route's (Dit geeft aan waar een gebruiker heen kan navigeren).
