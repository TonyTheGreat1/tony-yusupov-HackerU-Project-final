let countries = [];
let countriesFull = [];

const getDataThen = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            } else {
                return res.json();
            }
        }).then((data) => console.log(data))
        .catch((err) => console.log(err));
}

const getDataAsync = async () => {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data);
        countries = data;
        countriesFull = [...data];
    } catch (err) {
        console.log(err);
    }
}

const reset = () => {
    countries = [...countriesFull];
}

const search = (word) => {
    countries = countries.filter((country) => {
        const name = country.name.common.toLowerCase();
        return name.includes(word.toLowerCase());
    });
}

export { getDataAsync, countries, search, reset };