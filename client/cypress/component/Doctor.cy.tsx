import React from "react";
import Doctor from "@/app/doctor/dashboard/page";
import MockRouter from "../fixtures/MockRouter";
import 'cypress-localstorage-commands';
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("<Doctor>", () => {
  beforeEach(() => {
    cy.mount(
      <MockRouter asPath="/doctor/dashboard">
        <Provider store={store}>
          <Doctor />
        </Provider>
      </MockRouter>
    );
  });
  it("Logs in successfully", () => {
    cy.visit("/login"); 
    cy.get('input[name="username"]').type("your_username"); 
    cy.get('input[name="password"]').type("your_password"); 
    cy.get('button[type="submit"]').click(); 
  });
  it("Renders the homepage", () => {
    cy.get('main').should('be.visible');
  });
});




// describe('<Home>', () => {
//   it('Renders the homepage', () => {
//     cy.get('h1').contains('Connect');
//   });
//   it('should scroll to the ref when the button is clicked', () => {
//     cy.contains('See how it works').click();
//     cy.get('main').should('be.visible');
//   });
// });
// describe('<Users>', () => {
//   it('should display three user options', () => {
//     cy.get('.grid-users').within(() => {
//       cy.get('.users-left').should('be.visible');
//       cy.get('.users-center').should('be.visible');
//       cy.get('.users-right').should('be.visible');
//     });
//   });
//   it('should have links with the correct path', () => {
//     cy.get('.grid-users').within(() => {
//       cy.get('.users-left a').should('have.attr', 'href', '/patient/login');
//       cy.get('.users-center a').should(
//         'have.attr',
//         'href',
//         '/junior-doctor/login'
//       );
//       cy.get('.users-right a').should('have.attr', 'href', '/doctor/login');
//     });
//   });
// });