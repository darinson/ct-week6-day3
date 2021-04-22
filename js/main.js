// Taking in Form Data
const form = document.querySelector(`#ask-user-form`)

let queries = {}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    queries = {
        query_year: document.querySelector('#year').value,
        query_round: document.querySelector('#round').value
    }
    console.log(queries.query_year)
    console.log(queries.query_round)
})

// Data for Tableß
const getData = async () => {
    let season = document.querySelector('#year').value;
    let round = document.querySelector('#round').value;
    const url = `http://ergast.com/api/f1/${season}/${round}/driverstandings.json`
    let response = await axios.get(url)
    console.log(response)
    return response.data
}

const createRow = (position, firstname, lastname, nationality, sponsor, points, driver_url) => {
    const htmlRow = `<tr><th scope="row">${position}</th><td><a href=${driver_url}>${firstname} ${lastname}</a></td><td>${nationality}</td><td>${sponsor}</td><td>${points}</td></tr>`
    document.querySelector(`.show-standings`).insertAdjacentHTML(`beforeend`, htmlRow)
}

const loadData = async () => {
    const standings = await getData();
    const Info = standings.MRData.StandingsTable.StandingsLists[0].DriverStandings
    Info.forEach(element => createRow(
        element.position,
        element.Driver.givenName,
        element.Driver.familyName,
        element.Driver.nationality,
        element.Constructors[0].name,
        element.points,
        element.Driver.url))
}

