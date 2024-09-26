const fs = require('fs');
const targetPath = './src/environments/environment.ts';

const environmentFileContent = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  apiAuth: '${process.env.API_AUTH}',
  apiUsers: '${process.env.API_USERS}'
};
`;

fs.writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log('Error creating environment.ts file: ', err);
  } else {
    console.log('Successfully created environment.ts file for production');
  }
});
