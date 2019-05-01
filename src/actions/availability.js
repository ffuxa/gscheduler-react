import axios from 'axios';
import JSSoup from 'jssoup';
import {
  FETCHING_AVAILABILITY, FETCH_AVAILABILITY_FAILURE, FETCH_AVAILABILITY_SUCCESS
} from './types';

const EVENT_ID = "fyq9jbx";
const RESPONSE_CODE = "tm3bs28";

function parseWhenIsGoodAvailaviliy(data) {
  let soup = new JSSoup(data);
  let all_raw_scripts = soup.findAll("script");
  let raw = all_raw_scripts[all_raw_scripts.length - 1].text.split("\n");
  let results = raw.map(el => el.trim());
  results = results.filter(el => el.startsWith("r"));

  let students = [];
  let person_name = "";

  const nameEqualsPerson = x => {
    return x.name === person_name
  };

  for (let r of results) {
    if (r.includes(".name = ")) {
      person_name = r.split('"')[1];
      students.push({ name: person_name, avails: [] });
    }
    else if (r.includes(".myCanDos = ")) {
      // find the times
      let available = r.split('"')[1].split(',');

      // convert to datetime and add to dict
      for (let a of available) {
        let a_dt = new Date(parseInt(a));
        students[students.findIndex(nameEqualsPerson)].avails.push(a_dt);

        // students[person_name].push(a_dt);
      }
    }
  }

  console.log(students);

  return students;
}

export function getWhenIsGoodAvailability() {
  const proxy_url = "https://cors-anywhere.herokuapp.com/";
  const url = `http://whenisgood.net/${EVENT_ID}/results/${RESPONSE_CODE}`;

  return (dispatch) => {
    // Notify app that we are currently getting the availability
    dispatch({ type: FETCHING_AVAILABILITY });

    return axios.get(proxy_url + url)
      .then(response => {
        // Parse the input and return a map from student name to a list of avails
        let student_avails = parseWhenIsGoodAvailaviliy(response.data);
        dispatch({ type: FETCH_AVAILABILITY_SUCCESS, students: student_avails });
      })
      .catch(error => {
        console.log("error fetching...");
        dispatch({ type: FETCH_AVAILABILITY_FAILURE });
      });
  };
}