/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const fetch = require('node-fetch');

exports.submit = async (req, res) => {
  const { method, body } = req;
  res.set('Access-Control-Allow-Origin', '*');

  if (method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status('204').send('');
    return;
  }

  if (method !== 'POST') {
    res.status(405).send(`Method ${method} is not allowed.`);
    return;
  }

  console.info(body);

  const macroId = process.env.DEPLOYMENT_ID;
  await fetch(`https://script.google.com/macros/s/${macroId}/exec`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  res.status(200).send('ok');
};
