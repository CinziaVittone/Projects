// da usare in app x metter gli utenti
// props(dati)
// ciclare solo sulla riga e non su tutto il componente sennò creerebbe tante tabelle, io voglio solo tante righe
import "./Table.css";
const Table = ({
  data,
  row1,
  row2,
  row3,
  row4,
  row5,
  row6,
  row7,
  row8,
  getPerson,
}) => {
  // al click sulla riga della persona
  // HIGHER ORDER FUNCTION così nel return passo solo la funzione senza fare logica là dentro
  const onClick = (id) => () => {
    getPerson(id);
  };
  return (
    <table className="table">
      <tbody>
        <tr>
          <td>{row1}</td>
          <td>{row2}</td>
          <td>{row3}</td>
          <td>{row4}</td>
          <td>{row5}</td>
          <td>{row6}</td>
          <td>{row7}</td>
          <td>{row8}</td>
        </tr>
        {data &&
          data.map((person, i) => (
            <tr key={i} onClick={onClick(person.id)}>
              <td data-th="Name">{person.name}</td>
              <td data-th="Height">{person.height} cm</td>
              <td data-th="Mass">{person.mass} kg</td>
              <td data-th="Hair color">{person.hair_color}</td>
              <td data-th="Skin color">{person.skin_color}</td>
              <td data-th="Eye color">{person.eye_color}</td>
              <td data-th="Birth date">{person.birth_date}</td>
              <td data-th="Gender">{person.gender}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
