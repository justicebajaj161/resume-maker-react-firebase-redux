const url = 'http://localhost:3000';

describe('Before signin the navbar Signup and Signin', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
    cy.wait(5000);
  });

  it('App should contain Signup before signin', () => {
    cy.get('.navbar').contains(/sign up/i).should('be.visible');
  });

  it('App should contain Signin before signin', () => {
    cy.get('.navbar').contains(/sign in/i).should('be.visible');
  });

  it('App should not contain Details before signin', () => {
    cy.get('.navbar').contains(/details/i).should('not.exist');
  });

  it('App should not contain Resume before signin', () => {
    cy.get('.navbar').contains(/resume/i).should('not.exist');
  });

  it('App should not contain Logout before signin', () => {
    cy.get('.navbar').contains(/logout/i).should('not.exist');
  });
});

describe('App Routes Spec', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
    cy.wait(5000);
  });

  it('should not visit the details page because of protected routes', () => {
    cy.visit(`${url}/`); // Try visiting the root URL
    cy.url().should('eq', `${url}/signin`); // Expect to be redirected to /signin
  });


  it('should visit the signup page', () => {
    cy.visit(`${url}/signup`);
    cy.url().should('eq', `${url}/signup`);
  });

  it('should visit the signin page', () => {
    cy.visit(`${url}/signin`);
    cy.url().should('eq', `${url}/signin`);
  });

  it('should visit the cart page', () => {
    cy.visit(`${url}/resume`);
    cy.url().should('eq', `${url}/resume`);
  });
});




describe('Sign Up Flow', () => {
  // Visiting the Signup Page

  it('should visit the signup page', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);
    cy.url().should('eq', 'http://localhost:3000/signup');
  });
  // Checking elements in Signup Page
  it('should have firstname input', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);

    cy.get('input[name="firstName"]').should('be.visible');


  });

  it('should have lastname input', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);

    cy.get('input[name="lastName"]').should('be.visible');


  });

  it('should email input', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);

    cy.get('input[name="email"]').should('be.visible');
  });


  it('should password input', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);

    cy.get('input[name="password"]').should('be.visible');
  });

  it('should data of birth input', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);

    cy.get('input[name="dob"]').should('be.visible');
  });


  it('should gender input', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);

    cy.get('input[name="gender"]').should('be.visible');
  });

  it('should submit button', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);

    cy.get('button').contains(/submit/i).click();
  });


  // // Invalid Signup Attempt
  it('should not proceed and show toast error if all fields are not entered', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);
    
    // Filling in the form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="email"]').type('john.doe@example'); 
    cy.get('input[name="password"]').type('123'); // Password less than 6 characters
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Check for toast error message
    cy.contains(/Complete all fields/i).should('be.visible'); // Assuming the toast error is for not completing all fields
    cy.wait(5000);
    
    // Ensure we're still on the signup page after a failed submission
    cy.url().should('eq', `${url}/signup`);
  });

  it('should not proceed and show toast error if Password less than 6 characters', () => {
    cy.visit(`${url}/signup`);
    
    // Filling in the form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe'); // Assuming there's a last name field
    cy.get('input[name="email"]').type('john.doe@example.com'); 
    cy.get('input[name="password"]').type('123'); // Password less than 6 characters
    cy.get('input[name="dob"]').type('1990-01-01');  // Using a sample date
    cy.get('input[type="radio"][value="male"]').check(); // Selecting male gender as an example
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Check for toast error message regarding password length
    cy.contains(/Password should be at least 6 characters/i).should('be.visible'); 
    
    // Ensure we're still on the signup page after a failed submission
    cy.url().should('eq', `${url}/signup`);
});



  

  // Valid Signup Attempt
  // Note: This assumes the backend and the frontend are appropriately connected and will respond to valid credentials.
  it('should sign up with valid data', () => {
    cy.visit(`${url}/signup`);
    cy.wait(5000);
    // Using a unique email to ensure uniqueness during testing.
    const uniqueEmail = `test${Date.now()}@example.com`;

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe'); 
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="dob"]').type('1990-01-01');  // Using a sample date
    cy.get('input[type="radio"][value="male"]').check();
    cy.get('button').contains(/Submit/i).click();
    cy.wait(5000);
    // Assert that we are redirected to the homepage after successful sign-up.
    // Also, there can be an assertion for a success toast message or any other indication of a successful sign-up.
    cy.url().should('eq', 'http://localhost:3000/signin');
  });
});


describe('Login Flow', () => {
  // Visiting the Login Page
  it('should visit the login page', () => {
    cy.visit(`${url}/signin`);
    cy.wait(5000);
    cy.url().should('eq', 'http://localhost:3000/signin');
  });

  // Checking elements in Login Page
  it('should have email input', () => {
    cy.visit(`${url}/signin`);
    cy.wait(5000);
    cy.get('input[name="email"]').should('be.visible');
   
  });
  it('should have  password input ', () => {
    cy.visit(`${url}/signin`);
    cy.wait(5000);
  
    cy.get('input[name="password"]').should('be.visible');
   
  });
  it('should have submit button', () => {
    cy.visit(`${url}/signin`);
    cy.wait(5000);
   
    cy.get('button').contains(/submit/i).should('be.visible');
  });



  it('should not proceed and show toast error if Password less than 6 characters', () => {
    cy.visit(`${url}/signin`);
    
    // Filling in the form

    cy.get('input[name="email"]').type('john.doe@example.com'); 
    cy.get('input[name="password"]').type('123'); // Password less than 6 characters
 
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Check for toast error message regarding password length
    cy.contains(/Password should be at least 6 characters/i).should('be.visible'); 
    
    // Ensure we're still on the signup page after a failed submission
    cy.url().should('eq', `${url}/signin`);
});
  // Invalid Login Attempt
  it('should display error when invalid data is provided which havent signed up', () => {
    cy.visit(`${url}/signin`);
    cy.wait(5000);
    cy.get('input[name="email"]').type('invalid@codingninjas.com');
    cy.get('input[name="password"]').type('123453456'); // Password less than 6 characters
    cy.get('button').contains(/submit/i).click();


    // Assert that the error toast message is displayed
    cy.contains(/Invalid email or password/i).should('be.visible');
  });

  // Valid Login Attempt
  // Note: This assumes the backend and the frontend are appropriately connected and will respond to valid credentials.
  it('should login with valid data', () => {

    cy.visit(`${url}/signin`);
    cy.wait(5000);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com'); // Assuming this user is already registered
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains(/submit/i).click();
    cy.wait(5000);
    // wait for 2 seconds
    cy.url().should('eq', 'http://localhost:3000/');

  });


});

describe('logout in navbar', () => {
  before(() => {
      // Assuming your React app runs at localhost:3000
      cy.visit(`${url}/signin`);
  });

  it('logout clears the localstorage and kicks the user out to the signin page  because of protected routes', () => {
    
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com');
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains(/submit/i).click();
    cy.wait(5000);
    cy.url().should('eq', `${url}/`);
    cy.wait(5000);
    cy.contains(/logout/i).click()
    cy.visit(`${url}/signin`);
  });
});


describe('Posting Details and Rendering in Resume', () => {
  const loginUser = () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com');
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains(/submit/i).click();
    cy.wait(5000);
    cy.url().should('eq', `${url}/`);
  };

  const enterAndSubmitDetails = () => {
    cy.get('textarea[name="objective"]').clear().type('ParagraphParagraphs are the group of sentences combined together, about a certain topic. It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc. We can say that a well-structured paragraph is the essence of good writing. The purposes of the paragraph are to give information, to explain something, to tell a story, and to convince someone that our idea is right.Paragraphs are blocks of textual content that segment out a larger piece of writing—stories, novels, articles, creative writing, or professional writing portions—making it less complicated to read and understand. Excellent paragraphs are an available writing skill for plenty of types of literature, and proper writers can substantially beautify the clarity of their news, essays, or fiction writing whilst constructing nicely.');
    cy.get('textarea[name="experience"]').clear().type('3 years as a front-end developer.');
    cy.get('textarea[name="education"]').clear().type('B.S. in Computer Science.');
    cy.get('textarea[name="skills"]').clear().type('React, JavaScript, Cypress');
    cy.contains(/update/i).click();
};


  beforeEach(() => {
    loginUser();
  });

  it('details should consist of inputs', () => {
    cy.get('textarea[name="objective"]').should('be.visible');
    cy.get('textarea[name="experience"]').should('be.visible');
    cy.get('textarea[name="education"]').should('be.visible');
    cy.get('textarea[name="skills"]').should('be.visible');
  });

  it('should post user details', () => {
    enterAndSubmitDetails();
    cy.wait(3000)
    cy.contains(/Resume updated successfully/i).should('be.visible');
  });

  it('should render details in the resume', () => {
    cy.visit(`${url}/resume`);
    cy.wait(5000);

    cy.contains(/ParagraphParagraphs are the group of sentences combined together, about a certain topic. It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc. We can say that a well-structured paragraph is the essence of good writing. The purposes of the paragraph are to give information, to explain something, to tell a story, and to convince someone that our idea is right.Paragraphs are blocks of textual content that segment out a larger piece of writing—stories, novels, articles, creative writing, or professional writing portions—making it less complicated to read and understand. Excellent paragraphs are an available writing skill for plenty of types of literature, and proper writers can substantially beautify the clarity of their news, essays, or fiction writing whilst constructing nicely./i).should('be.visible'); // Reduced the text for brevity and simplicity
  
  });
  it('all textareas should be filled', () => {
    enterAndSubmitDetails();
    
    // Ensure each textarea is filled with the corresponding value
    cy.get('textarea[name="objective"]').should('have.value', 'ParagraphParagraphs are the group of sentences combined together, about a certain topic. It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc. We can say that a well-structured paragraph is the essence of good writing. The purposes of the paragraph are to give information, to explain something, to tell a story, and to convince someone that our idea is right.Paragraphs are blocks of textual content that segment out a larger piece of writing—stories, novels, articles, creative writing, or professional writing portions—making it less complicated to read and understand. Excellent paragraphs are an available writing skill for plenty of types of literature, and proper writers can substantially beautify the clarity of their news, essays, or fiction writing whilst constructing nicely.');
    cy.get('textarea[name="experience"]').should('have.value', '3 years as a front-end developer.');
    cy.get('textarea[name="education"]').should('have.value', 'B.S. in Computer Science.');
    cy.get('textarea[name="skills"]').should('have.value', 'React, JavaScript, Cypress');
});



});


describe('Field validations', () => {
  const loginUser = () => {
    cy.visit(`${url}/signin`);
    cy.get('input[name="email"]').type('codingninjas@codingninjas.com');
    cy.get('input[name="password"]').type('codingninjas');
    cy.get('button').contains(/submit/i).click();
    cy.wait(5000);
    cy.url().should('eq', `${url}/`);
  };
  beforeEach(() => {
      loginUser(); // Assumes you've already logged in, as from your previous test cases
      // Assumes the page with the form is at "/details"
  });

  const checkRequiredFieldsToast = () => {
      cy.contains(/update/i).click(); // Clicks the update button
      cy.contains('All fields are required!').should('be.visible'); // Checks for the toast error
  };

  it('shows toast error when objective field is empty', () => {
    cy.get('textarea[name="objective"]').clear()
      cy.get('textarea[name="experience"]').type('Some experience.');
      cy.get('textarea[name="education"]').type('Some education.');
      cy.get('textarea[name="skills"]').type('Some skills.');
      cy.wait(5000)
      checkRequiredFieldsToast();
  });

  it('shows toast error when experience field is empty', () => {
      cy.get('textarea[name="objective"]').type('Some objective.');
      cy.get('textarea[name="experience"]').clear();
      cy.get('textarea[name="education"]').type('Some education.');
      cy.get('textarea[name="skills"]').type('Some skills.');
      checkRequiredFieldsToast();
  });

  it('shows toast error when education field is empty', () => {
      cy.get('textarea[name="objective"]').type('Some objective.');
      cy.get('textarea[name="experience"]').type('Some experience.');
      cy.get('textarea[name="education"]').clear();
      cy.get('textarea[name="skills"]').type('Some skills.');
      checkRequiredFieldsToast();
  });

  it('shows toast error when skills field is empty', () => {
      cy.get('textarea[name="objective"]').type('Some objective.');
      cy.get('textarea[name="experience"]').type('Some experience.');
      cy.get('textarea[name="education"]').type('Some education.');
      cy.get('textarea[name="skills"]').clear();
      checkRequiredFieldsToast();
  });
});


describe('Redux integration tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');  // Replace this with your app's URL
  });

  it('should have Redux store initialized', () => {
    cy.window().its('store').should('exist');
  });

  it('should have auth reducer', () => {
    cy.window().its('store').invoke('getState').its('auth').should('exist');
  });

});




describe('Responsive Navbar', () => {
  
  beforeEach(() => {
    // Navigate to your website
    cy.visit(`${url}/`);

    // If needed, set the authenticated state
    // Example: Mocking user authentication 
    // cy.window().its('store').invoke('dispatch', { type: 'SET_AUTHENTICATED' });
  });

  it('checks navbar in desktop view', () => {
    cy.viewport(1024, 768);

    cy.get('.navbar-toggler').should('not.be.visible');
   
  });

  it('checks navbar in mobile view', () => {
    cy.viewport(375, 667);

    cy.get('.navbar-toggler').should('be.visible').click();
  ;
  });


})


