<h2>BeiT - Ukol</h2>
vytvorit malou Angular appku s vyuzitim PrimeNg knihovny
<ul>
<li>
Landing obrazovka by mela zobrazovat jednoduchou tabulku aut
<ul>
<li>
namockovanych par aut dotahovat ze service
</li>
<li>
tabulka by mela mit tyto sloupce: ID, SPZ, Znacka, Cena (zobrazit v ceskem formatu), Datum vydani (zobrazit v ceskem formatu), Akce
</li>
<li>
sloupce budou dynamicke
</li>
<li>
sloupec Akce bude obsahovat tlacitko "Prejit na detail"
</li>
</ul>
</li>
<li>
Po zmacknuti tlacitka "Prejit na detail" otevrit vyjizdeci postrani listu, ktera v sobe bude mit novou komponentu
detailu auta
<ul>
<li>
v komponente detailu bude jednoduchy Angular formular, ktery bude kopirovat data z tabulky s moznosti editace (krom ID,
ID bude disabled) a tlacitko Ulozit (zavre listu a prepise data auta v tabulce) a Zavrit (zavre listu)
</li>
<li>
vsechny fieldy formulare budou required, jinak to nedovoli detail ulozit
</li>
<li>
fieldy budou v tomto formatu: ID, SPZ - text input; Znacka - dropdown; Cena - number input s ceskym formatovanim; Datum
vydani - calendar s ceskym formatovanim
</li>
</ul>
</li>
<li>
Vsechny pouzite PrimeNg komponenty muzou byt v defaultnim stylu, krom Dropdownu, ktery nastylovat podle prilozenych
obrazku
</li>
</ul>
<h3>modely zadani:</h3>

```
interface Car {
  id: number;
  licencePlate: string;
  brand: CarBrand;
  price: number;
  createdDate: Date;
}

type CarBrand = 'AUDI' | 'BMW' | 'MERCEDES' | 'SKODA';
```
