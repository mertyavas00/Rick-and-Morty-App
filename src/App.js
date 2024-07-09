import React, { useState, useEffect } from "react";
import axios from "axios"; //API kullanımı için
import CharacterTable from "./components/CharacterTable";
import CharacterDetails from "./components/CharacterDetails";
import "./styles.css";

const App = () => {
  const [characters, setCharacters] = useState([]); // Tüm karakterler
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Filtrelenmiş karakterler
  const [selectedCharacter, setSelectedCharacter] = useState(null); //Seçili karakterler
  const [loading, setLoading] = useState(true); //Yükleme durumu 
  const [error, setError] = useState(null); //Hata mesajı
  const [currentPage, setCurrentPage] = useState(0); //Geçerli sayfa numarası
  const [itemsPerPage, setItemsPerPage] = useState(10); //Sayfa başına gösterilecek karakterler
  const [sortOrder, setSortOrder] = useState({ key: "", order: "asc" }); //Sıralama durumu

  //İlk render sonrası karakter verilerini çekmek için useEffect kullanımı
  useEffect(() => {
    const fetchData = async () => {
      let allCharacters = [];
      try {
        for (let i = 1; i <= 42; i++) {
          // 42, API'nin toplam sayfa sayısı
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character/?page=${i}`
          );
          allCharacters = [...allCharacters, ...response.data.results];
        }
        setCharacters(allCharacters);
        setFilteredCharacters(allCharacters);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //Sayfa değişikliği işlemi
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  //Karakter seçme işlemi
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    const element = document.getElementById("bottom");
    element.scrollIntoView();
  };

  //Filtreleme işlemi
  const handleFilter = () => {
    const filters = document.getElementsByClassName("filter");
    const filtersDropdown = document.getElementsByClassName("filter-dropdown");
    var filtered = characters;
    Array.from(filters).forEach((element) => {
      filtered = filtered.filter((character) =>
        character[element.id]
          ?.toLowerCase()
          .includes(element.value.toLowerCase())
      );
    });
    Array.from(filtersDropdown).forEach((element) => {
      filtered = filtered.filter(
        (character) =>
          character[element.id]?.toLowerCase() ===
            element.value.toLowerCase() || element.value === "all"
      );
    }); //Dropdown kutucuklarında birebir filtreleme, metin kutularında içermeli filtreleme
    setFilteredCharacters(filtered);
    setCurrentPage(0); // Filtreleme sonrası ilk sayfaya dön
  };

  //Sıralama işlemi
  const handleSort = (key) => {
    const order =
      sortOrder.key === key && sortOrder.order === "asc" ? "desc" : "asc";
    const sorted = [...filteredCharacters].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredCharacters(sorted);
    setSortOrder({ key, order });
  };

  //Sayfa başına gösterilecek öğre sayısını değiştirme işlemi
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0); // Sayfa boyutu değiştiğinde ilk sayfaya dön
  };

  //Geçerli sayfada gösterilecek karakterlerin hesaplanması
  const currentCharacters = filteredCharacters.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="app">
      <h1>Rick and Morty Characters</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="filter-sort-controls">
        {/*İsim filtresi için metin kutusu*/}
        <input
          id="name"
          className="filter"
          type="text"
          placeholder="Filter by name"
          onChange={() => handleFilter()}
        />
        {/* Tür filtresi için metin kutusu*/}
        <input
          id="species"
          className="filter"
          type="text"
          placeholder="Filter by species"
          onChange={() => handleFilter()}
        />
        {/* Durum ve cinsiyet filtreleri az seçenekli olduğu için metin inputu yerine seçenek inputu eklendi*/}
        
        {/* Durum filtresi için dropdown kutucuğu*/}
        <select id="status" className="filter-dropdown" onChange={handleFilter}>
          <option value={"all"}>All</option>
          <option value={"alive"}>Alive</option>
          <option value={"dead"}>Dead</option>
          <option value={"unknown"}>Unknown</option>
        </select>
        {/* Cinsiyet filtresi için dropdown kutucuğu*/}
        <select id="gender" className="filter-dropdown" onChange={handleFilter}>
          <option value={"all"}>All</option>
          <option value={"female"}>Female</option>
          <option value={"male"}>Male</option>
          <option value={"genderless"}>Genderless</option>
          <option value={"unknown"}>Unknown</option>
        </select>
        {/* Sayfada kaç karakter görüneceğini seçmek için dropdown kutucuğu*/}
        <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      {filteredCharacters.length === 0 ? (
        <p className="no-data">No Data Found</p> //İstenen filtrede sonuç bulunmazsa kullanıcıya gösterilecek mesaj
      ) : (
        <CharacterTable
          characters={currentCharacters}
          onCharacterSelect={handleCharacterSelect}
          onPageChange={handlePageChange}
          pageCount={Math.ceil(filteredCharacters.length / itemsPerPage)}
          onSort={handleSort}
          sortOrder={sortOrder}
        />
      )}
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
      <div id="bottom"></div>
    </div>
  );
};

export default App;
