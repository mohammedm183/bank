/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import all other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super();
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  }

  // Fetch Credits and Debits Data
  async componentDidMount() {
    try {
      // Fetching credits
      const creditResponse = await fetch("https://johnnylaicode.github.io/api/credits.json");
      const credits = await creditResponse.json();

      // Fetching debits
      const debitResponse = await fetch("https://johnnylaicode.github.io/api/debits.json");
      const debits = await debitResponse.json();

      // Calculate totals
      const totalCredits = credits.reduce((sum, c) => sum + c.amount, 0);
      const totalDebits = debits.reduce((sum, d) => sum + d.amount, 0);
      const calculatedBalance = (totalCredits - totalDebits).toFixed(2);

      // Update state
      this.setState({
        creditList: credits,
        debitList: debits,
        accountBalance: parseFloat(calculatedBalance),
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Add new credit and update account balance
  addCredit = (newCredit) => {
    const updatedCredits = [...this.state.creditList, newCredit];
    const totalCredits = updatedCredits.reduce((sum, c) => sum + c.amount, 0);
    const totalDebits = this.state.debitList.reduce((sum, d) => sum + d.amount, 0);
    const newBalance = (totalCredits - totalDebits).toFixed(2);

    this.setState({
      creditList: updatedCredits,
      accountBalance: parseFloat(newBalance),
    });
  };

  // Add new debit and update account balance
  addDebit = (newDebit) => {
    const updatedDebits = [...this.state.debitList, newDebit];
    const totalCredits = this.state.creditList.reduce((sum, c) => sum + c.amount, 0);
    const totalDebits = updatedDebits.reduce((sum, d) => sum + d.amount, 0);
    const newBalance = (totalCredits - totalDebits).toFixed(2);

    this.setState({
      debitList: updatedDebits,
      accountBalance: parseFloat(newBalance),
    });
  };

  // Create Routes and React elements to be rendered using React components
  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);

    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    );

    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    );

    
    return (
      <Router basename="/bank">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;