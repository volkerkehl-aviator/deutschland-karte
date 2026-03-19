const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.getPins = async (req, res) => {
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const pins = rows.map(row => ({
    name: row.Name,
    lat: parseFloat(row.Lat),
    lng: parseFloat(row.Lng),
    info: row.Info
  }));

  res.set('Access-Control-Allow-Origin', '*');
  res.json(pins);
};
