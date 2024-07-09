import React from "react";
import ReactPaginate from "react-paginate"; //Sayfalama yapabilmek için

const CharacterTable = ({
  characters,
  onCharacterSelect,
  onPageChange,
  pageCount,
  onSort,
  sortOrder,
}) => {
  //Sıralama işaretçisini almak için yardımcı fonksiyon
  const getSortIndicator = (key) => {
    if (sortOrder.key === key) {
      return sortOrder.order === "asc" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <div className="character-table">
      <table>
        <thead>
          <tr>
            <th>
              Name
              {/* İsim sütunu için sıralama düğmesi*/}
              <button onClick={() => onSort("name")}>
                Sort {getSortIndicator("name")}
              </button>
            </th>
            <th>
              Status
              {/* Durum sütunu için sıralama düğmesi*/}
              <button onClick={() => onSort("status")}>
                Sort {getSortIndicator("status")}
              </button>
            </th>
            <th>
              Species
              {/* Tür sütunu için sıralama düğmesi*/}
              <button onClick={() => onSort("species")}>
                Sort {getSortIndicator("species")}
              </button>
            </th>
            <th>
              Gender
              {/* Cinsiyet sütunu için sıralama düğmesi*/}
              <button onClick={() => onSort("gender")}>
                Sort {getSortIndicator("gender")}
              </button>
            </th>
            <th>Origin</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {/* Karakterlerin tablo satırları */}
          {characters.map((character) => (
            <tr key={character.id} onClick={() => onCharacterSelect(character)}>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>{character.gender}</td>
              <td>{character.origin.name}</td>
              <td>{character.location.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Sayfalandırma bileşeni */}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(data) => onPageChange(data.selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default CharacterTable;
