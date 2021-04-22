// Taking in Form Data
const form = document.querySelector(`#ask-user-form`)

let queries = {}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    queries = {
        query_year: document.querySelector('#year').value,
        query_round: document.querySelector('#round').value
    }
})

// Data for Table
const getData = async () => {
    let season = document.querySelector('#year').value;
    let round = document.querySelector('#round').value;
    const url = `http://ergast.com/api/f1/${season}/${round}/driverstandings.json`
    let response = await axios.get(url)
    return response.data
}

const createRow = (position, firstname, lastname, nationality, sponsor, points, driver_url) => {
    const htmlRow = `<tr><th scope="row">${position}</th><td><a href=${driver_url}>${firstname} ${lastname}</a></td><td>${nationality}</td><td>${sponsor}</td><td>${points}</td></tr>`
    document.querySelector(`.show-standings`).insertAdjacentHTML(`beforeend`, htmlRow)
}

const loadData = async () => {
    const standings = await getData();
    console.log(standings)
    document.querySelector(`.show-standings`).innerHTML = ''
    if (standings.MRData.StandingsTable.StandingsLists.length == 0) {
        document.querySelector(`.show-standings`).insertAdjacentHTML(`beforeend`, '<p>Nothing to show here!</p>')
    } else {
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
}

