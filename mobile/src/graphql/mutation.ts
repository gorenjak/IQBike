import {gql} from '@apollo/client';

export const POSTAJALISCA_S_KOLESI_QUERY = gql`
  query postajaliscaSKolesi {
    postajalisca {
      _id
      ime
      latitude
      longitude
      kolesaArray {
        _id
        serijska_stevilka
        mnenje
      }
    }
  }
`;

export const IZPOSOJA_KOLESA_MUTATION = gql`
  mutation izposodiKolo($input: IzposojaKolesa!) {
    izposojaKolesa(input: $input) {
      _id
      start_date
      start_station
      start_station_id
      bike_id
      username
      trenutna_zasedenost_start
    }
  }
`;

export const VRACILO_KOLESA_MUTATION = gql`
  mutation vrniKolo($input: VraciloKolesa!) {
    vraciloKolesa(input: $input) {
      _id
      bike_id
      username
      trenutna_zasedenost_end
      end_date
      end_station
      end_station_id
    }
  }
`;

export const INSERT_MNENJE_MUTATION = gql`
  mutation oceniKolo($_id: String!, $mnenje: Int!) {
    insertMnenje(_id: $_id, mnenje: $mnenje)
  }
`;

export const NAJDI_IZPOSOJE_QUERY = gql`
  query najdiIzposoje($username: String!) {
    izposojeForUser(username: $username) {
      _id
      start_date
      end_date
      username
      trenutna_zasedenost_end
      trenutna_zasedenost_start
      start_station
      end_station
    }
  }
`;
