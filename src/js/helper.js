import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    // convert to json
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}> ${res.status}`);
    return data;
  } catch (err) {
    // to get err from model
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fechPro = await fetch(url);
    const res = await Promise.race([fechPro, timeout(TIMEOUT_SEC)]);

    // convert to json
    const data = await res.json();

    // handle err

    if (!res.ok) throw new Error(`${data.message}> ${res.status}`);
    return data;
  } catch (err) {
    // to get err from model
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fechPro = await fetch(url);
    const res = await Promise.race([
      timeout(TIMEOUT_SEC),
  ]);
  
    // convert to json
    const data = await res.json();
    
    fechPro,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    },
    // handle err

    if (!res.ok) throw new Error(`${data.message}> ${res.status}`);
    return data;
  } catch (err) {
    // to get err from model
    throw err;
  }
};
*/
