
export async function getPeople() {
    try {
        const response = await fetch("https://www.swapi.tech/api/people");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error searching for People:", error);
        return null;
    }
};

export default getPeople;