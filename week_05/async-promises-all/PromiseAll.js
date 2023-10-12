/**
 * Fetches public repo information from GitHub for a specific company
 * @param {String} companyName Company name
 * @returns A list of repo names belonging to the company
 */
async function getCompanyRepos(companyName) {
  // Since fetch isn't in NodeJS, use a library to polyfill it
  const fetch = require("node-fetch");

  // Fetch the company's repos from GitHub
  const response = await fetch(
    `https://api.github.com/orgs/${companyName}/repos`
  );
  const data = await response.json();

  // If the response is not OK, throw an error
  // This is the same as Promise.reject() in non-async functions
  if (response.status !== 200) {
    throw new Error(`Response of ${response.status} for ${companyName}`);
  }

  // Push the full names of each repo into an array
  const repoArray = [];
  data.forEach((repo) => repoArray.push(repo.full_name));

  return repoArray;
}

// TODO: change it so that it prints out the companies names
// all at once
function question1() {
  const microsoftRepos = getCompanyRepos("microsoft");
  const googleRepos = getCompanyRepos("google");
  const canvaRepos = getCompanyRepos("canva");
  
  Promise.all([microsoftRepos, googleRepos, canvaRepos])
    .then(companies => {
      companies.forEach(company => {
        company.forEach(repo => {
          console.log(repo);
        })
      })
    })
}

// TODO: modify the question1() code to use async & await instead
async function question2() {
  const microsoftRepos = getCompanyRepos("microsoft");
  const googleRepos = getCompanyRepos("google");
  const canvaRepos = getCompanyRepos("canva");
  
  const companies = await Promise.all([microsoftRepos, googleRepos, canvaRepos]);
  companies.forEach(company => {
    company.forEach(repo => {
      console.log(repo);
    })
  })
}

// TODO: try to get repos from a fake company (in which the promise will be rejected)
// and see if the overall Promise.all will resolve or reject when one is rejected
async function question3() {
  const microsoftRepos = getCompanyRepos("microsoft");
  const fakeRepos = getCompanyRepos("some_fake_company");
  
  const companies = await Promise.all([microsoftRepos, fakeRepos]);
  companies.forEach(company => {
    company.forEach(repo => {
      console.log(repo);
    })
  })
}

// TODO: Use Promise.allSettled to print the repo names of "microsoft", "google", "canva" 
// and "some_fake_company".
// If you encounter a status === "rejected" item, log the reason for it rejecting.
async function question4() {
  const microsoftRepos = getCompanyRepos("microsoft");
  const googleRepos = getCompanyRepos("google");
  const canvaRepos = getCompanyRepos("canva");
  const fakeRepos = getCompanyRepos("some_fake_company");
  
  const companies = await Promise.allSettled([microsoftRepos, googleRepos, canvaRepos, fakeRepos]);
  companies.forEach(company => {
    if (company.status === "fulfilled") {
      company.value.forEach(repo => {
        console.log(repo);
      });
    } else {
      console.log(company.reason);
    }
  })
}

question1();
question2();
question3();
question4();