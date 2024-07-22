import Constants from 'expo-constants';

export async function fetchBliznjaPostajalisca(input) {
  try {
    console.log('Fetching data ->');
    const response = await fetch(Constants.manifest?.extra?.graphqlUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `query bliznjaPostajalisca($latitude: Float!, $longitude: Float!, $stPostaj: Int!) {
              nearestPostajalisce(latitude: $latitude, longitude: $longitude, stPostaj: $stPostaj) {
                _id
                ime
                latitude
                longitude
              }
            }`,
        variables: {
          latitude: input.latitude,
          longitude: input.longitude,
          stPostaj: 3,
        },
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Napaka pri pridobivanju podatkov:', error);
    return [];
  }
}

export async function fetchIzposoje(input) {
  try {
    console.log('Fetching data ->');
    const response = await fetch(Constants.manifest?.extra?.graphqlUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `query najdiIzposoje($username: String!) {
            izposojeForUser(username: $username) {
              _id
              start_date
              end_date
              username
              trenutna_zasedenost_end
              trenutna_zasedenost_start
              start_station 
              end_station
              duration
            }
          }`,
        variables: {
          username: input.username,
        },
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Napaka pri pridobivanju podatkov:', error);
    return [];
  }
}
