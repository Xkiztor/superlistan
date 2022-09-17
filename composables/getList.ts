import { ref } from 'vue';
// import { projectFirestore } from '../firebase/config'
// import { store } from '../firebase/config.js'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';


const getList = () => {
  // type List = {
  //   vetenskapligtNamn: string,
  //   prisMedMoms: string,
  //   typ: string,
  //   id: string
  // }

  // const list = ref<List[]>([])

  const firebaseConfig = {
    apiKey: 'AIzaSyCr5Kfc4wRTn5pxSErQEChA7bKCd24KGlk',
    authDomain: 'superlista-test.firebaseapp.com',
    projectId: 'superlista-test',
    storageBucket: 'superlista-test.appspot.com',
    messagingSenderId: '1027313639402',
    appId: '1:1027313639402:web:f8109fa0f0aa61cafe5c93',
    measurementId: 'G-K3DT0S7JWB',
  };
  const app = initializeApp(firebaseConfig);

  // const db = getFirestore(app);

  // const colRef = collection(db, 'ListaTest');

  // onSnapshot(colRef, (snap) => {
  //   snap.docs.forEach((doc) => {
  //     list.value.push({ ...doc.data(), id: doc.id} as List);
  //   })
  // })

  const list = ref('Hello');

  // const fs = require('fs');

  // const readTxt = fs.readFile('../public/data.txt', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(data);
  // });

  // readTxt()

  const csv2json = (str, delimiter = ',') => {
    const titles = str.slice(0, str.indexOf('\n')).split(delimiter);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    return rows.map((row) => {
      const values = row.split(delimiter);
      return titles.reduce(
        (object, curr, i) => ((object[curr] = values[i]), object),
        {}
      );
    });
  };

  let csv = 'text weight\nLorem 15\nIpsum 9';
  // let csv = csvData
  let word_array = csv2json(csv, ' ');
  // console.log(word_array);
  console.log(list.value)


  return { list };
};

export default getList;
