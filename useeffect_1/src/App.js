import "./App.css";
import { useEffect, useState } from "react";
import Table from "./components/Table/Table";
import "./components/Table/Table.css";

function App() {
  // 1 creo il mio stato
  const [users, setUsers] = useState([]);
  // stato per il form
  const [enteredName, setName] = useState(""); // first name
  const [enteredSurname, setSurname] = useState(""); // last name
  const [enteredEmail, setEmail] = useState(""); // email
  const [enteredAge, setAge] = useState(""); // age

  // 2 creo la funzione per ottenere gli utenti usando la fetch
  // get
  const getUsers = () => {
    fetch("http://localhost:8080/users") //chiamata al be, espongo il mio db fittizio sulla porta 8080
      // utilizzo delle callbacks, funzioni anonime come argomento di altre funzioni
      .then((response) => response.json()) // converto la response in json, il mio dato
      // 3 setto l'elemento, lo valorizzo
      .then((users) => {
        console.log(users); // per capire cosa mi serve esattamente, capisco che mi serve results
        setUsers(users);
      }) // ottengo il mio oggetto
      .catch((error) => console.log("Request failed", error));
  };

  // post
  /**
   * The JSON.stringify() static method converts a JavaScript value to a JSON string,
   * optionally replacing values if a replacer function is specified
   * or optionally including only the specified properties if a replacer array is specified
   */
  const postAddUser = (newUser) => {
    fetch("http://localhost:8080/users", {
      body: JSON.stringify(newUser),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.error(error);
      });
  };

  // PER INVIARE IL FORM
  const submitHandler = (event) => {
    // per evitare che si ricarichi la pagina
    // event.preventDefault();
    // lo decommento così la ricarica e vedo subito la modifica

    // oggetto
    const userData = {
      firstName: enteredName,
      lastName: enteredSurname,
      email: enteredEmail,
      age: enteredAge,
    };

    // salvataggio dei dati
    // data.onSaveUser(userData);
    // lo faccio qua perchè devo inserire il nuovo utente nel momento in cui clicco sul bottone
    // al bottone infatti è legato il submit che scatena nel form l'onSubmit che a sua volta fa partire la funzione submitHandler
    postAddUser(userData);
    // inoltre lo aggiunge al db.json
    // una volta che invio il form, gli input tornano vuoti, ripartono da ""
    setName("");
    setSurname("");
    setEmail("");
    setAge("");
  };

  // 4 useEffect
  useEffect(() => {
    getUsers();
  }, []);

  // 4 FUNZIONI DI GESTIONE DELLE MODIFICHE SINGOLARMENTE DEI SINGOLI INPUT
  // first name
  const nameChangeHandler = (event) => {
    setName(event.target.value);
    // non faccio qua dentro la post altrimenti all'evento onChange(evento specifico degli input, ogni volta che clicco) aggiungerebbe sempre un utente
  };

  // last name
  const surnameChangeHAndler = (event) => {
    setSurname(event.target.value);
  };

  // email
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  // age
  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  // voglio inoltre che i campi siano obbligatori così da non inserire utenti vuoti
  return (
    <div className="App">
      <Table
        data={users}
        row1="FIRST NAME"
        row2="LAST NAME"
        row3="EMAIL"
        row4="AGE"
      />

      <form onSubmit={submitHandler}>
        <label htmlFor="firstName">NAME:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          value={enteredName}
          onChange={nameChangeHandler}
        />
        <br />
        <br />
        <label htmlFor="lastName">LAST NAME:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={enteredSurname}
          onChange={surnameChangeHAndler}
        />
        <br />
        <br />
        <label htmlFor="email">EMAIL:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
        <br />
        <br />
        <label htmlFor="age">AGE:</label>
        <input
          type="number"
          id="age"
          name="age"
          required
          value={enteredAge}
          onChange={ageChangeHandler}
        />
        <br />
        <br />
        <button type="submit">+ ADD</button>
      </form>
    </div>
  );
}

export default App;
// {myuser.name.first} prima perchè dovevo accedere a quello per avere il nome
// key={myuser.id} aveva un id quindi come keys usavo quello
// non ho un id invece qua quindi uso index fornito da map()
// (myuser, index)
// key={index}
