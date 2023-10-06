// nome cognome compleanno
// da usare in app x metter gli utenti
// props(dati)
// ciclare solo sulla riga e non su tutto il componente sennò creerebbe tante tabelle, io voglio solo tante righe
import "./Table.css";
const Table = ({ data, row1, row2, row3, row4 }) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <td>{row1}</td>
          <td>{row2}</td>
          <td>{row3}</td>
          <td>{row4}</td>
        </tr>
        {data &&
          data.map((user, i) => (
            <tr key={i}>
              <td data-th="First Name">{user.firstName}</td>
              <td data-th="Last Name">{user.lastName}</td>
              <td data-th="Gender">{user.email}</td>
              <td data-th="Birth Year">{user.age}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
