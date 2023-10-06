import "./App.css";
import { useState, useEffect } from "react"; // ctrl spazio selezionando l'elemento
import Table from "./components/Table/Table";
import "./components/Table/Table.css";

function App() {
  // useState con destructuring
  // elemento, funzione che setta l'elemento
  // creo lo stato per l'array
  const [people, setPeople] = useState([]); // array vuoto all'inizio, poi array di oggetti
  // se non specifico lo stato iniziale è automaticamente undefined useState()
  // useState([]) indica che all'inizio è un array vuoto, che verrà poi riempito con i miei oggetti
  // stato per il form ADD
  const [enteredName, setEnteredName] = useState("");
  // in genere a meno che non si debbano fare dei calcoli è meglio definirli come stringhe, height solo x esempio
  const [enteredHeight, setEnteredHeight] = useState(0); // tipizzato a number, di default definito così
  const [enteredMass, setEnteredMass] = useState("");
  const [enteredHairColor, setEnteredHairColor] = useState("");
  const [enteredSkinColor, setEnteredSkinColor] = useState("");
  const [enteredEyeColor, setEnteredEyeColor] = useState("");
  const [enteredBirthDate, setEnteredBirthDate] = useState("");
  const [enteredGender, setEnteredGender] = useState("");

  // id della persona
  const [idPerson, setIdPerson] = useState(); // stato iniziale undefined ()
  // persona selezionata

  // stato per il form UPDATE, lo faccio unico
  const [updatePerson, setUpdatePerson] = useState();

  // per settare l'id della persona
  const getPerson = (personId) => {
    setIdPerson(personId);
  };

  // USEEFFECT PER UPDATE PERSON
  // ho create un nuovo url che fa riferimento all'id per recuperare una persona specifica http://localhost:8080/people/2
  useEffect(() => {
    idPerson &&
      fetch(`http://localhost:8080/people/${idPerson}`) // sto esponendo il be, la mia chiamata al be
        .then((response) => response.json()) // converti a json
        .then(
          // set dentro lo scope altrimenti i dati non li trova
          // callback
          // questa volta recuperiamo solo una person
          (person) => {
            console.log(person);
            setUpdatePerson(person);
            // setSelectedPerson(person);
          }
        )
        .catch((error) => console.log("Request failed", error));
  }, [idPerson]); // con la dipendenza, deve essere uno stato, in questo caso è lo stato dell'id

  // PER GET ALL PEOPLE
  // creo la funzione per ottenere le people usando la get
  // get, non necessita di un body
  // chiamata fetch API per recuperare people dal be
  // se mettessi https://swapi.dev/api/people/2 ad esempio, recupererei la persona con id2
  const getAllPeople = () => {
    // fetch("https://swapi.dev/api/people"
    fetch("http://localhost:8080/people") // sto esponendo il be, la mia chiamata al be
      .then((response) => response.json()) // converti a json
      .then(
        // setPeople dentro lo scope altrimenti i dati non li trova
        // callback
        (people) => {
          console.log(people);
          setPeople(people);
        }
      ) // stampa i dati sulla console, il dato è json
      .catch((error) => console.log("Request failed", error)); // gestisce gli errori
    // (json) => console.log(json) sintassi implicita che evita il return e le graffe
    // implicitamente dico di fare il reutn del console.log e avendo una sola istruizione non sono necessarie le graffe
  };

  // PER ADD PERSON
  // post, la differenza con il get è che necessita di un body
  /**
   * The JSON.stringify() static method converts a JavaScript value to a JSON string,
   * optionally replacing values if a replacer function is specified
   * or optionally including only the specified properties if a replacer array is specified
   */
  const postAddPerson = (newPerson) => {
    // devo richiamare il mio db, su quello online non posso fare modifiche, posso solo fare la get
    // nel package.json ho impostato la porta 8080
    // fetch("https://swapi.dev/api/people", {

    // conviene mettere le fetch sempre dentro un try-catch così fa vedere subito l'errore nel caso
    try {
      fetch("http://localhost:8080/people", {
        body: JSON.stringify(newPerson),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Errore: " + error);
    }
  };

  // PER UPDATE PERSON
  // put rivaluta completamente la risorsa, come se sovrascrivesse tutto, la crea se non esiste
  // patch modifica SOLO il campo che scegliamo, se la risorsa non esite da errore
  const patchUpdatePerson = (personToUpdate) => {
    try {
      fetch(`http://localhost:8080/people/${idPerson}`, {
        body: JSON.stringify(personToUpdate),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Errore: " + error);
    }
  };

  // INVIO FORM UPDATE
  const submitUpdatePerson = (e) => {
    // e.preventDefault();

    const name = e.target.name.value; // devo andare a recuperare il valore che avevo inserito prima
    const height = e.target.height.value;
    const mass = e.target.mass.value;
    const hair_color = e.target.hair_color.value;
    const skin_color = e.target.skin_color.value;
    const eye_color = e.target.eye_color.value;
    const birth_date = e.target.birth_date.value;
    const gender = e.target.gender.value;

    // invece che fare name: name ecc, js riconosce già di cosa si tratta
    //oggetto person
    const personData = {
      name,
      height,
      mass,
      hair_color,
      skin_color,
      eye_color,
      birth_date,
      gender,
    };

    patchUpdatePerson(personData);
    console.log("personData update", personData);
  };

  // INVIO FORM ADD
  const submitHandler = (event) => {
    // per evitare che si ricarichi la pagina
    // inizialmente lo tengo attivo così da vedere gli errori, poi lo disattivo così davedere le modifiche in tempo reale
    // event.preventDefault();
    // lo decommento così la ricarica e vedo subito la modifica

    // oggetto person
    const personData = {
      // id:2, devo mettere l'id nel db json, oppure qua, SERVE
      // devo metterlo nel db l'id SEMPRE anche se in partenza non c'è, da 0 in poi
      // determina l'univocità del record
      name: enteredName,
      height: enteredHeight,
      mass: enteredMass,
      hair_color: enteredHairColor,
      skin_color: enteredSkinColor,
      eye_color: enteredEyeColor,
      birth_date: enteredBirthDate,
      gender: enteredGender,
    };

    // lo faccio qua perchè devo inserire il nuovo utente nel momento in cui clicco sul bottone
    // al bottone infatti è legato il submit che scatena nel form l'onSubmit che a sua volta fa partire la funzione submitHandler
    postAddPerson(personData);

    // dopo aver inviato il form i campi ritornano vuoti
    setEnteredName("");
    setEnteredHeight("");
    setEnteredMass("");
    setEnteredHairColor("");
    setEnteredSkinColor("");
    setEnteredEyeColor("");
    setEnteredBirthDate("");
    setEnteredGender("");
  };

  // USEEFFECT PER ADD PERSON
  // parte quando viene renderizzato il componente, []
  useEffect(() => {
    getAllPeople();
  }, []); // [] indica che deve essere eseguita solo quando carico la pagina SOLO la prima volta
  //   useEffect(() => {
  //  getAllPeople();
  // });
  // se non avessi indicato dipendenze allora l'avrebbe eseguita ogni volta che ricaricavo o aggiornavo la pagina

  // FORM ADD
  // funzioni di gestione delle modifiche singolarmente dei singoli input
  // name
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  // height
  const heightChangeHandler = (event) => {
    setEnteredHeight(event.target.value);
  };

  // mass
  const massChangeHandler = (event) => {
    setEnteredMass(event.target.value);
  };

  // hair color
  const hairColorChangeHandler = (event) => {
    setEnteredHairColor(event.target.value);
  };

  // skin color
  const skinColorChangeHandler = (event) => {
    setEnteredSkinColor(event.target.value);
  };

  // eye color
  const eyeColorChangeHandler = (event) => {
    setEnteredEyeColor(event.target.value);
  };

  // birth year
  const birthDateChangeHandler = (event) => {
    setEnteredBirthDate(event.target.value);
  };

  // gender
  const genderChangeHandler = (event) => {
    setEnteredGender(event.target.value);
  };

  // FORM UPDATE
  // funzioni di gestione delle modifiche singolarmente dei singoli input
  // si baseranno tutte su un unico stato, quello dell'update person, da lì andrò a modificare solo quello che mi serve
  // name
  const nameChangeHandlerUpdate = (event) => {
    // setEnteredNameUpdate(event.target.value);
    setUpdatePerson((prevState) => {
      return { ...prevState, name: event.target.value };
      // utilizzo un'istantanea dello stato precedente in modo che sia sempre aggiornato
      // spread operator dello stato precedente e poi modifico solo la proprietà name mettendogli event.target.value che è ciò che scrivo nell'input
    });
  };

  // height
  const heightChangeHandlerUpdate = (event) => {
    // setEnteredHeightUpdate(event.target.value);
    setUpdatePerson((prevState) => {
      return { ...prevState, height: event.target.value };
    });
  };

  // mass
  const massChangeHandlerUpdate = (event) => {
    // setEnteredMassUpdate(event.target.value);
    setUpdatePerson((prevState) => {
      return { ...prevState, mass: event.target.value };
    });
  };

  // hair color
  const hairColorChangeHandlerUpdate = (event) => {
    // setEnteredHairColorUpdate(event.target.value);
    setUpdatePerson((prevState) => {
      return { ...prevState, hair_color: event.target.value };
    });
  };

  // skin color
  const skinColorChangeHandlerUpdate = (event) => {
    // setEnteredSkinColorUpdate(event.target.value);
    setUpdatePerson((prevState) => {
      return { ...prevState, skin_color: event.target.value };
    });
  };

  // eye color
  const eyeColorChangeHandlerUpdate = (event) => {
    // setEnteredEyeColorUpdate(event.target.value);
    setUpdatePerson((prevState) => {
      return { ...prevState, eye_color: event.target.value };
    });
  };

  // birth year
  const birthDateChangeHandlerUpdate = (event) => {
    // setEnteredBirthDateUpdate(event.target.value);
    setUpdatePerson((prevState) => {
      return { ...prevState, birth_date: event.target.value };
    });
  };

  // gender
  const genderChangeHandlerUpdate = (event) => {
    // setEnteredGenderUpdate(event.target.value);
    setUpdatePerson((prevState) => {
      return { ...prevState, gender: event.target.value };
    });
  };

  return (
    <div className="App">
      <Table
        getPerson={getPerson} //per ottenere la persona
        data={people}
        row1="NAME"
        row2="HEIGHT"
        row3="MASS"
        row4="HAIR COLOR"
        row5="SKIN COLOR"
        row6="EYE COLOR"
        row7="BIRTH DATE"
        row8="GENDER"
      />
      {/* i type che darò qua dovranno corrispondere a quelli nel db json
      per i numeri a meno che non serviranno per fare calcoli, solitamente si tengono a stringa,
      per usare il type date ho modificato il formato della data nel json */}

      {/* FORM ADD */}
      <form onSubmit={submitHandler}>
        <label htmlFor="updateForm">
          <b>ADD PERSON</b>
        </label>
        <br />
        <br />
        <label htmlFor="name">NAME:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={enteredName}
          onChange={nameChangeHandler}
        />
        <br />
        <br />

        {/* se voglio che nel be venga mandato come number allora devo modificarlo dal db.json e metterlo come numero là */}
        <label htmlFor="height">HEIGHT:</label>
        <input
          type="number"
          id="height"
          name="height"
          required
          value={enteredHeight}
          onChange={heightChangeHandler}
        />
        <br />
        <br />

        <label htmlFor="mass">MASS:</label>
        <input
          type="number"
          id="mass"
          name="mass"
          required
          value={enteredMass}
          onChange={massChangeHandler}
        />
        <br />
        <br />

        <label htmlFor="hairColor">HAIR COLOR:</label>
        <input
          type="text"
          id="hairColor"
          name="hairColor"
          required
          value={enteredHairColor}
          onChange={hairColorChangeHandler}
        />
        <br />
        <br />

        <label htmlFor="skinColor">SKIN COLOR:</label>
        <input
          type="text"
          id="skinColor"
          name="skinColor"
          required
          value={enteredSkinColor}
          onChange={skinColorChangeHandler}
        />
        <br />
        <br />

        <label htmlFor="eyeColor">EYE COLOR:</label>
        <input
          type="text"
          id="eyeColor"
          name="eyeColor"
          required
          value={enteredEyeColor}
          onChange={eyeColorChangeHandler}
        />
        <br />
        <br />

        {/* Note: The displayed date format will differ from the actual value 
        — the displayed date is formatted based on the locale of the user's browser, 
        but the parsed value is always formatted yyyy-mm-dd. */}
        <label htmlFor="birthDate">BIRTH DATE:</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          required
          value={enteredBirthDate}
          onChange={birthDateChangeHandler}
        />
        <br />
        <br />

        {/* per valori con scelta predefinita è meglio usare una select */}
        <label htmlFor="gender">GENDER:</label>
        <select
          name="gender"
          required
          value={enteredGender}
          onChange={genderChangeHandler}
        >
          <option value=""></option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <br />
        <br />

        <button type="submit">
          <b>ADD</b>
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </form>

      {/* FORM UPDATE */}
      {/* se selectedPerson è true allora mostra il form, lo mostra solo quando seleziono una persona,
      collegato alla funzione di aggiornamento */}
      {updatePerson && (
        <form onSubmit={submitUpdatePerson}>
          <label htmlFor="updateForm">
            <b>UPDATE PERSON</b>
          </label>
          <br />
          <br />
          <label htmlFor="name">NAME:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={updatePerson.name}
            onChange={nameChangeHandlerUpdate}
          />
          <br />
          <br />

          <label htmlFor="height">HEIGHT:</label>
          <input
            type="number"
            id="height"
            name="height" 
            required
            value={updatePerson.height}
            onChange={heightChangeHandlerUpdate}
          />
          <br />
          <br />

          <label htmlFor="mass">MASS:</label>
          <input
            type="number"
            id="mass"
            name="mass"
            required
            value={updatePerson.mass}
            onChange={massChangeHandlerUpdate}
          />
          <br />
          <br />

          <label htmlFor="hair_color">HAIR COLOR:</label>
          <input
            type="text"
            id="hair_color"
            name="hair_color"
            required
            value={updatePerson.hair_color}
            onChange={hairColorChangeHandlerUpdate}
          />
          <br />
          <br />

          <label htmlFor="skin_color">SKIN COLOR:</label>
          <input
            type="text"
            id="skin_color"
            name="skin_color"
            required
            value={updatePerson.skin_color}
            onChange={skinColorChangeHandlerUpdate}
          />
          <br />
          <br />

          <label htmlFor="eye_color">EYE COLOR:</label>
          <input
            type="text"
            id="eye_color"
            name="eye_color"
            required
            value={updatePerson.eye_color}
            onChange={eyeColorChangeHandlerUpdate}
          />
          <br />
          <br />

          <label htmlFor="birth_date">BIRTH DATE:</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            required
            value={updatePerson.birth_date}
            onChange={birthDateChangeHandlerUpdate}
          />
          <br />
          <br />

          <label htmlFor="gender">GENDER:</label>
          <select
            name="gender"
            required
            value={updatePerson.gender}
            onChange={genderChangeHandlerUpdate}
          >
            <option value=""></option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          <br />
          <br />

          <button type="submit">
            <b>UPDATE</b>
          </button>
        </form>
      )}
      {/* <header className="App-header"> */}
      {/* per ritornare il dato nel jsx e fare si che gli elementi vengano inseriti nell'array */}
      {/* {data &&
          data.map((date, index) => {
            return <p key={index}>{date.name}</p>;
          })} */}
      {/* </header> */}
    </div>
  );
}

export default App;
